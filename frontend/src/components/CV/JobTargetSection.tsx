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

export default function JobTargetSection({ jobTitle, setJobTitle }: JobTargetSectionProps) {
  const [industry, setIndustry] = useState("Software & Technology");

  return (
    <div className="bg-[#1E293B] border border-white/[0.06] rounded-2xl p-6 mb-6">
      <h5 className="font-bold mb-5 text-white flex items-center gap-2">
        <span className="material-symbols-outlined text-[#7C3AED] text-xl">work</span>
        2. Job Target
      </h5>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold text-sm text-[#A1A1AA] mb-2">
            Target Industry
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full bg-[#0A0A0F] border border-white/[0.1] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#7C3AED] transition-colors"
          >
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold text-sm text-[#A1A1AA] mb-2">
            Specific Job Title
          </label>
          <input
            type="text"
            placeholder="e.g. Senior Frontend Engineer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full bg-[#0A0A0F] border border-white/[0.1] rounded-lg px-4 py-2.5 text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#7C3AED] transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
