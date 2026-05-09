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
  "Senior (6+ years)",
];

export default function ManualDetailsForm({ formData, setFormData }: ManualDetailsFormProps) {
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <>
      <div className="my-5 text-center text-[#71717A] text-sm font-semibold">
        — Or manually enter your details —
      </div>
      <div className="mb-4">
        <label className="block font-semibold text-sm text-[#A1A1AA] mb-2">Full Name</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full bg-[#0A0A0F] border border-white/[0.1] rounded-lg px-4 py-2.5 text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#7C3AED] transition-colors"
          placeholder="Youssef Ibrahim"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold text-sm text-[#A1A1AA] mb-2">Experience Level</label>
        <select
          className="w-full bg-[#0A0A0F] border border-white/[0.1] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#7C3AED] transition-colors"
          value={formData.experienceLevel}
          onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
        >
          {EXPERIENCE_OPTIONS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold text-sm text-[#A1A1AA] mb-2">Key Skills (Tags)</label>
        <div className="border border-white/[0.1] rounded-lg p-3 flex flex-wrap gap-2 bg-[#0A0A0F]">
          {formData.skills.map((skill) => (
            <span
              key={skill}
              className="bg-[#7C3AED]/15 text-[#7C3AED] flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
            >
              {skill}
              <span
                className="ml-2 cursor-pointer hover:text-white"
                onClick={() => removeSkill(skill)}
              >
                ×
              </span>
            </span>
          ))}
          <input
            type="text"
            className="bg-transparent border-0 flex-grow-1 outline-none text-white placeholder:text-[#71717A] min-w-[120px]"
            placeholder="Add skill..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </>
  );
}
