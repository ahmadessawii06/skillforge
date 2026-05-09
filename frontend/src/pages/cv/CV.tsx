import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileProgress from "../../components/CV/ProfileProgress.tsx";
import UploadCVSection, { type CVFormData } from "../../components/CV/UploadCVSection.tsx";
import ManualDetailsForm, { type ManualFormData } from "../../components/CV/ManualDetailsForm.tsx";
import JobTargetSection from "../../components/CV/JobTargetSection.tsx";
import ProfileNavigation from "../../components/CV/ProfileNavigation.tsx";
import ProfileInfoNotice from "../../components/CV/ProfileInfoNotice.tsx";
import { createCV, createInterview, extractCVData } from "../../../services/interviewFlowService.ts";
import type { GenerateInterviewQuestionsRequest } from "../../../services/interviewQuestionService.ts";

const ProfileSetupPage = () => {
  const navigate = useNavigate();

  const [cvFormData, setCvFormData] = useState<CVFormData>({});
  const [formData, setFormData] = useState<ManualFormData>({
    fullName: "",
    experienceLevel: "Entry Level (0-2 years)",
    skills: ["Python", "JavaScript"],
  });

  const [jobTitle, setJobTitle] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isManualFilled = formData.fullName.trim() !== "";
  const step = !cvFormData.file && !isManualFilled ? 1 : jobTitle.trim() === "" ? 2 : 3;

  const handleContinue = async () => {
    if (step < 3 || saving) return;

    setSaving(true);
    setError(null);

    try {
      const userId = getCurrentUserId();
      let cvSummary: string;
      let aiSkills = formData.skills;

      if (cvFormData.file) {
        try {
          const parsed = await extractCVData(cvFormData.file);
          const mergedSkills = Array.from(new Set([...(parsed.skills ?? []), ...formData.skills]));
          aiSkills = mergedSkills.slice(0, 20);

          cvSummary = [
            parsed.name ? `Candidate: ${parsed.name}` : formData.fullName ? `Candidate: ${formData.fullName}` : "",
            parsed.title ? `Current title: ${parsed.title}` : "",
            jobTitle.trim() ? `Target role: ${jobTitle.trim()}` : "",
            aiSkills.length ? `Skills: ${aiSkills.join(", ")}` : "",
            parsed.experience?.length ? `Experience:\n${parsed.experience.map((e) => ` - ${e.role} at ${e.company} (${e.period})`).join("\n")}` : "",
            parsed.education?.length ? `Education:\n${parsed.education.map((e) => ` - ${e.degree} at ${e.institution} (${e.year})`).join("\n")}` : "",
          ].filter(Boolean).join("\n");
        } catch (extractErr) {
          console.error("CV extraction failed:", extractErr);
          cvSummary = [
            formData.fullName ? `Candidate: ${formData.fullName}` : "",
            cvFormData.file ? `Uploaded CV: ${cvFormData.file.name}` : "",
            aiSkills.length ? `Skills: ${aiSkills.join(", ")}` : "",
            jobTitle ? `Target role: ${jobTitle}` : "",
          ].filter(Boolean).join("\n");
        }
      } else {
        cvSummary = [
          formData.fullName ? `Candidate: ${formData.fullName}` : "",
          aiSkills.length ? `Skills: ${aiSkills.join(", ")}` : "",
          jobTitle ? `Target role: ${jobTitle}` : "",
        ].filter(Boolean).join("\n");
      }

      const finalGenerationRequest: GenerateInterviewQuestionsRequest = {
        role: jobTitle.trim() || "Frontend Developer",
        experienceLevel: formData.experienceLevel,
        difficulty: "mixed",
        count: 5,
        skills: aiSkills,
        questionTypes: ["technical", "communication", "behavioral"],
        cvSummary,
      };

      const cv = await createCV({
        userId,
        fileName: cvFormData.file?.name || `${formData.fullName || "Manual"} profile`,
        uploadAt: new Date().toISOString(),
        experience_level: formData.experienceLevel,
        target_job_title: jobTitle.trim(),
      });

      const interview = await createInterview(userId, cv.id);

      navigate(`/interview?interviewId=${interview.id}`, {
        state: {
          generationRequest: {
            ...finalGenerationRequest,
            interviewId: interview.id,
            saveToInterview: true,
          },
        },
      });
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(`${message} You can still practice, but analysis will require the backend interview to be created.`);
      navigate("/interview", {
        state: {
          generationRequest: {
            role: jobTitle.trim() || "Frontend Developer",
            experienceLevel: formData.experienceLevel,
            difficulty: "mixed",
            count: 5,
            skills: formData.skills,
            questionTypes: ["technical", "problem_solving", "behavioral"],
          },
        },
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-16 sm:pt-20 lg:pt-24 pb-12">
      <div className="max-w-[640px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <ProfileProgress step={step} />

        <div className="bg-[#1E293B] border border-white/[0.06] rounded-2xl p-4 sm:p-6 mb-6">
          <UploadCVSection formData={cvFormData} setFormData={setCvFormData} />
          <ManualDetailsForm formData={formData} setFormData={setFormData} />
        </div>

        <JobTargetSection jobTitle={jobTitle} setJobTitle={setJobTitle} />

        <ProfileNavigation
          onNext={handleContinue}
          disabled={step < 3 || saving}
          label={saving ? "Preparing Interview..." : "Save and Continue"}
        />

        {error && <p className="text-[#EF4444] text-sm mt-2">{error}</p>}

        <ProfileInfoNotice />
      </div>
    </div>
  );
};

export default ProfileSetupPage;

function getCurrentUserId(): number {
  const rawUser = localStorage.getItem("user");
  if (!rawUser) return 1;
  try {
    const user = JSON.parse(rawUser) as { id?: unknown };
    return typeof user.id === "number" ? user.id : 1;
  } catch {
    return 1;
  }
}

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object") {
    const maybeError = error as { message?: unknown; error?: unknown };
    if (typeof maybeError.message === "string") return maybeError.message;
    if (typeof maybeError.error === "string") return maybeError.error;
  }
  return "Could not prepare the interview.";
}
