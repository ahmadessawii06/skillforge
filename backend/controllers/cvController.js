const { CV, User } = require("../models");
const OpenAI = require('openai');
const { AI_CONFIG } = require('../config/ai.js');
const multer = require('multer');
const pdfParse = require('pdf-parse');

const upload = multer({ storage: multer.memoryStorage() });
exports.upload = upload;

// Create CV
exports.createCV = async (req, res) => {
  try {
    const { userId, fileName, uploadAt, experience_level, target_job_title } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const cv = await CV.create({ userId, fileName, uploadAt, experience_level, target_job_title });
    res.status(201).json({ message: "CV created successfully", cv });
  } catch (error) {
    res.status(500).json({ message: "Error creating CV", error: error.message });
  }
};

// Get all CVs
exports.getAllCVs = async (req, res) => {
  try {
    const cvs = await CV.findAll({ include: [{ model: User, as: "user", attributes: ["id", "fullName", "email"] }] });
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ message: "Error getting CVs", error: error.message });
  }
};

// Get CVs by user
exports.getCVsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const cvs = await CV.findAll({ where: { userId }, include: [{ model: User, as: "user", attributes: ["id", "fullName", "email"] }] });
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ message: "Error getting user CVs", error: error.message });
  }
};

// Extract CV data using AI
exports.extractCVData = async (req, res) => {
  try {
    let text = req.body.text;
    if (req.file) {
      const pdfData = await pdfParse(req.file.buffer);
      text = pdfData.text;
    }
    if (!text) return res.status(400).json({ message: "CV text or file is required" });

    const client = new OpenAI({
      baseURL: AI_CONFIG.baseURL,
      apiKey: AI_CONFIG.apiKey,
      timeout: AI_CONFIG.timeout
    });

    const completion = await client.chat.completions.create({
      model: AI_CONFIG.model,
      temperature: AI_CONFIG.temperature,
      max_tokens: AI_CONFIG.maxTokens,
      messages: [
        { role: 'system', content: 'You are a CV parser. Return ONLY valid JSON, no markdown, no extra text.' },
        { role: 'user', content: `Extract structured data from this CV and return ONLY this JSON:
{
  "name": "string",
  "title": "string",
  "email": "string or null",
  "phone": "string or null",
  "skills": ["array of skills"],
  "experience": [{"company": "", "role": "", "period": "", "highlights": []}],
  "education": [{"degree": "", "institution": "", "year": ""}]
}
CV:
${text}` }
      ]
    });

    const raw = completion.choices[0]?.message?.content;
    const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
    res.status(200).json({ success: true, data: parsed });

  } catch (error) {
    console.error('[CV Extraction Error]:', {
      message: error.message,
      status: error.status,
      type: error.type,
      model: AI_CONFIG.model
    });
    res.status(500).json({ message: "Error extracting CV data", error: error.message });
  }
};
