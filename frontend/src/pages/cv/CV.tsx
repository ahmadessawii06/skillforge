


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
    // States لكل قسم
    const [cvFormData, setCvFormData] = useState<CVFormData>({});
    const [formData, setFormData] = useState<ManualFormData>({
        fullName: "",
        experienceLevel: "Entry Level (0-2 years)",
        skills: ["Python", "Product Design"],
    });
    const [jobTitle, setJobTitle] = useState<string>("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isManualFilled = formData.fullName.trim() !== "";

    const step = !cvFormData.file && !isManualFilled
        ? 1
        : jobTitle.trim() === ""
            ? 2
            : 3;


    const handleContinue = async () => {
        if (step < 3 || saving) return;

        setSaving(true);
        setError(null);

        try {
            const userId = getCurrentUserId();

            // --- Extract real CV content from uploaded PDF ---
            let cvSummary: string;
            let aiSkills = formData.skills;

            if (cvFormData.file) {
                try {
                    const parsed = await extractCVData(cvFormData.file);
                    // Merge AI-parsed skills with manually entered ones
                    const mergedSkills = Array.from(
                        new Set([...(parsed.skills ?? []), ...formData.skills])
                    );
                    aiSkills = mergedSkills.slice(0, 20);

                    cvSummary = [
                        parsed.name   ? `Candidate: ${parsed.name}`   : formData.fullName ? `Candidate: ${formData.fullName}` : '',
                        parsed.title  ? `Current title: ${parsed.title}` : '',
                        jobTitle.trim() ? `Target role: ${jobTitle.trim()}` : '',
                        aiSkills.length ? `Skills: ${aiSkills.join(', ')}` : '',
                        parsed.experience?.length
                            ? `Experience:\n${parsed.experience.map(e => `  - ${e.role} at ${e.company} (${e.period})`).join('\n')}`
                            : '',
                        parsed.education?.length
                            ? `Education:\n${parsed.education.map(e => `  - ${e.degree} at ${e.institution} (${e.year})`).join('\n')}`
                            : ''
                    ].filter(Boolean).join('\n');
                } catch (_extractErr) {
                    // CV extraction failed — fall back to manual summary
                    cvSummary = [
                        formData.fullName ? `Candidate: ${formData.fullName}` : '',
                        cvFormData.file ? `Uploaded CV: ${cvFormData.file.name}` : '',
                        aiSkills.length ? `Skills: ${aiSkills.join(', ')}` : '',
                        jobTitle ? `Target role: ${jobTitle}` : ''
                    ].filter(Boolean).join('\n');
                }
            } else {
                // No file — use manually entered data
                cvSummary = [
                    formData.fullName ? `Candidate: ${formData.fullName}` : '',
                    aiSkills.length ? `Skills: ${aiSkills.join(', ')}` : '',
                    jobTitle ? `Target role: ${jobTitle}` : ''
                ].filter(Boolean).join('\n');
            }

            const finalGenerationRequest: GenerateInterviewQuestionsRequest = {
                role: jobTitle.trim() || 'Frontend Developer',
                experienceLevel: formData.experienceLevel,
                difficulty: 'mixed',
                count: 5,
                skills: aiSkills,
                questionTypes: ['technical', 'communication', 'behavioral'],
                cvSummary
            };

            const cv = await createCV({
                userId,
                fileName: cvFormData.file?.name || `${formData.fullName || 'Manual'} profile`,
                uploadAt: new Date().toISOString(),
                experience_level: formData.experienceLevel,
                target_job_title: jobTitle.trim()
            });
            const interview = await createInterview(userId, cv.id);

            navigate(`/ai?interviewId=${interview.id}`, {
                state: {
                    generationRequest: {
                        ...finalGenerationRequest,
                        interviewId: interview.id,
                        saveToInterview: true
                    }
                }
            });
        } catch (err: unknown) {
            const message = getErrorMessage(err);
            setError(`${message} You can still practice, but analysis will require the backend interview to be created.`);
            navigate('/ai', {
                state: { generationRequest: {
                    role: jobTitle.trim(),
                    experienceLevel: formData.experienceLevel,
                    difficulty: 'mixed',
                    count: 5,
                    skills: formData.skills,
                    questionTypes: ['technical', 'communication', 'behavioral'],
                }}
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-vh-100" style={{ background: "#F3F4F6" ,marginTop: "70px"}}>
            {/*/!* Navbar *!/*/}
            {/*<nav className="navbar bg-white border-bottom px-4" style={{ height: "60px" }}>*/}
            {/*    <div className="d-flex align-items-center gap-2">*/}
            {/*        <div*/}
            {/*            className="bg-primary rounded-2 d-flex align-items-center justify-content-center"*/}
            {/*            style={{ width: "32px", height: "32px" }}*/}
            {/*        >*/}
            {/*            <span className="text-white fw-bold" style={{ fontSize: "13px" }}>AI</span>*/}
            {/*        </div>*/}
            {/*        <span className="fw-bold fs-6">InterviewAI</span>*/}
            {/*    </div>*/}
            {/*    <div className="ms-auto">*/}
            {/*        <div*/}
            {/*            className="border rounded-circle d-flex align-items-center justify-content-center"*/}
            {/*            style={{ width: "36px", height: "36px", cursor: "pointer" }}*/}
            {/*        >*/}
            {/*            <svg width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">*/}
            {/*                <circle cx="12" cy="8" r="4" />*/}
            {/*                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />*/}
            {/*            </svg>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</nav>*/}

            {/* Page Content */}
            <div className="mx-auto py-5 px-3" style={{ maxWidth: "620px", width: "100%" }}>
                {/* Progress Bar */}
                <ProfileProgress step={step} />

                {/* Sections */}
                {/* Upload + Manual in ONE Card */}
                <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                    <UploadCVSection formData={cvFormData} setFormData={setCvFormData} />
                    <ManualDetailsForm formData={formData} setFormData={setFormData} />
                </div>

                <JobTargetSection jobTitle={jobTitle} setJobTitle={setJobTitle} />

                {/* Navigation */}
                <ProfileNavigation
                    onNext={handleContinue}
                    disabled={step < 3 || saving}
                    label={saving ? "Preparing Interview..." : "Save and Continue"}
                    // onBack={() => {
                    //     if (step > 1) {
                    //         // لا حاجة لتحديث state
                    //     }
                    // }}
                />
                {error && <p className="text-danger small mt-2">{error}</p>}

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
