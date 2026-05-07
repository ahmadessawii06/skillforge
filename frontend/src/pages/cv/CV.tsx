import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileProgress from "../../components/CV/ProfileProgress.tsx";
import UploadCVSection, { type CVFormData } from "../../components/CV/UploadCVSection.tsx";
import ManualDetailsForm, { type ManualFormData } from "../../components/CV/ManualDetailsForm.tsx";
import JobTargetSection from "../../components/CV/JobTargetSection.tsx";
import ProfileNavigation from "../../components/CV/ProfileNavigation.tsx";

const ProfileSetupPage = () => {
    const navigate = useNavigate();
    const [cvFormData, setCvFormData] = useState<CVFormData>({});
    const [formData, setFormData] = useState<ManualFormData>({
        fullName: "",
        experienceLevel: "Entry Level (0-2 years)",
        skills: ["Python", "Product Design"],
    });
    const [jobTitle, setJobTitle] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const isManualFilled = formData.fullName.trim() !== "";
    const step = !cvFormData.file && !isManualFilled ? 1 : jobTitle.trim() === "" ? 2 : 3;

    const handleNext = async () => {
        setLoading(true);
        try {
            let cvData = null;

            // لو في ملف PDF، استخرج البيانات منه
            if (cvFormData.file) {
                const fd = new FormData();
                fd.append('cv', cvFormData.file);

                const extractRes = await fetch('http://localhost:3000/api/cvs/extract', {
                    method: 'POST',
                    body: fd,
                });
                const extractResult = await extractRes.json();
                cvData = extractResult.data;
            } else {
                // لو manual
                cvData = {
                    name: formData.fullName,
                    title: jobTitle,
                    skills: formData.skills,
                };
            }

            // ولّد الأسئلة من البيانات
            const questionsRes = await fetch('http://localhost:3000/api/questions/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    interviewId: 1,
                    cvData: cvData,
                }),
            });
            const questionsResult = await questionsRes.json();

            // روح لصفحة الأسئلة مع البيانات
            navigate('/ai', { state: { cvData, questions: questionsResult.questions } });

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100" style={{ background: "#F3F4F6", marginTop: "70px" }}>
            <div className="mx-auto py-5 px-3" style={{ maxWidth: "620px", width: "100%" }}>
                <ProfileProgress step={step} />
                <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                    <UploadCVSection formData={cvFormData} setFormData={setCvFormData} />
                    <ManualDetailsForm formData={formData} setFormData={setFormData} />
                </div>
                <JobTargetSection jobTitle={jobTitle} setJobTitle={setJobTitle} />
                <ProfileNavigation onNext={handleNext} />
                {loading && <p className="text-center text-primary mt-3">جاري المعالجة...</p>}
            </div>
        </div>
    );
};

export default ProfileSetupPage;