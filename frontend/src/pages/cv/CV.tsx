


import { useState } from "react";
import ProfileProgress from "../../components/CV/ProfileProgress.tsx";
import UploadCVSection, { type CVFormData } from "../../components/CV/UploadCVSection.tsx";
import ManualDetailsForm, { type ManualFormData } from "../../components/CV/ManualDetailsForm.tsx";
import JobTargetSection from "../../components/CV/JobTargetSection.tsx";
import ProfileNavigation from "../../components/CV/ProfileNavigation.tsx";
import ProfileInfoNotice from "../../components/CV/ProfileInfoNotice.tsx";

const ProfileSetupPage = () => {
    // States لكل قسم
    const [cvFormData, setCvFormData] = useState<CVFormData>({});
    const [formData, setFormData] = useState<ManualFormData>({
        fullName: "",
        experienceLevel: "Entry Level (0-2 years)",
        skills: ["Python", "Product Design"],
    });
    const [jobTitle, setJobTitle] = useState<string>("");

    const isManualFilled = formData.fullName.trim() !== "";

    const step = !cvFormData.file && !isManualFilled
        ? 1
        : jobTitle.trim() === ""
            ? 2
            : 3;


    return (
        <div className="min-vh-100" style={{ background: "#F3F4F6" }}>
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
                    onNext={() => {
                        if (step < 3) {
                            // لا حاجة لتحديث state، يمكن التحكم بالـUI في ProfileNavigation
                        }
                    }}
                    onBack={() => {
                        if (step > 1) {
                            // لا حاجة لتحديث state
                        }
                    }}
                />

                <ProfileInfoNotice />
            </div>
        </div>
    );
};

export default ProfileSetupPage;
