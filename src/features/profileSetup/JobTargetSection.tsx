import { useState } from "react";

const INDUSTRIES = [
    "Software & Technology",
    "Finance & Banking",
    "Healthcare",
    "Marketing & Advertising",
    "Education",
    "Engineering",
    "Design & Creative",
    "Sales & Business Development",
];

interface JobTargetSectionProps {
    jobTitle: string;
    setJobTitle: React.Dispatch<React.SetStateAction<string>>;
}

const JobTargetSection: React.FC<JobTargetSectionProps> = ({ jobTitle, setJobTitle }) => {
    const [industry, setIndustry] = useState("Software & Technology");

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h5 className="fw-bold mb-4">⊙ 2. Job Target</h5>
            <div className="row g-3">
                {/* Target Industry */}
                <div className="col-md-6">
                    <label className="form-label fw-semibold small">Target Industry</label>
                    <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="form-select"
                    >
                        {INDUSTRIES.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                        ))}
                    </select>
                </div>

                {/* Specific Job Title */}
                <div className="col-md-6">
                    <label className="form-label fw-semibold small">Specific Job Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Senior Frontend Engineer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="form-control"
                    />
                </div>
            </div>
        </div>
    );
};

export default JobTargetSection;
