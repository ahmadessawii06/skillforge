import React, { useState } from "react";
import type { KeyboardEvent } from "react";

export interface ManualFormData {
    fullName: string;
    experienceLevel: string;
    skills: string[];
}

interface ManualDetailsFormProps {
    formData: ManualFormData;
    setFormData: React.Dispatch<React.SetStateAction<ManualFormData>>;
}

const EXPERIENCE_OPTIONS = [
    "Entry Level (0-2 years)",
    "Junior (2-4 years)",
    "Mid-Level (4-6 years)",
    "Senior (6+ years)"
];

const ManualDetailsForm: React.FC<ManualDetailsFormProps> = ({ formData, setFormData }) => {
    const [skillInput, setSkillInput] = useState("");

    const addSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
            setSkillInput("");
        }
    };

    const removeSkill = (skill: string) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") { e.preventDefault(); addSkill(); }
    };

    return (
        <>
            {/* Divider */}
            <div className="d-flex align-items-center gap-3 my-4 text-muted small fw-semibold">
                <hr className="flex-grow-1 m-0" />
                Or manually enter your details
                <hr className="flex-grow-1 m-0" />
            </div>

            {/* Card */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-light">

                {/* Full Name */}
                <div className="mb-3">
                    <label className="form-label small fw-semibold text-primary">Full Name</label>
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="form-control rounded-3"
                        placeholder="Enter your full name"
                    />
                </div>

                {/* Experience Level */}
                <div className="mb-3">
                    <label className="form-label small fw-semibold text-primary">Experience Level</label>
                    <select
                        className="form-select rounded-3"
                        value={formData.experienceLevel}
                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    >
                        {EXPERIENCE_OPTIONS.map(option => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* Skills */}
                <div>
                    <label className="form-label small fw-semibold text-primary">Key Skills (Tags)</label>
                    <div className="border rounded-3 p-2 d-flex flex-wrap gap-2 align-items-center bg-white">
                        {formData.skills.map(skill => (
                            <span key={skill} className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center px-3 py-2 rounded-pill fw-semibold">
                                {skill}
                                <span className="ms-2" style={{ cursor: "pointer" }} onClick={() => removeSkill(skill)}>×</span>
                            </span>
                        ))}
                        <input
                            type="text"
                            className="border-0 flex-grow-1 bg-transparent"
                            style={{ outline: "none", minWidth: 100 }}
                            placeholder="Add skill..."
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManualDetailsForm;