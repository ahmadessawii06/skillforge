const skills = [
  { name: "Technical Knowledge", percentage: 0 },
  { name: "Problem Solving", percentage: 0 },
  { name: "Communication", percentage: 0 },
  { name: "Behavioral Responses", percentage: 0 },
];

export default function SkillProgress() {
  return (
    <div className="bg-[#1E293B] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
      <h2 className="text-base sm:text-lg font-bold text-white mb-1">Skill Progress</h2>
      <p className="text-xs sm:text-sm text-[#A1A1AA] mb-4 sm:mb-5">Your performance across key areas</p>

      <div className="flex flex-col gap-3 sm:gap-4">
        {skills.map((skill, idx) => (
          <div key={idx}>
            {/* Skill name and percentage */}
            <div className="flex justify-between font-semibold mb-2">
              <span className="text-xs sm:text-sm text-white leading-tight">{skill.name}</span>
              <span className="text-xs sm:text-sm text-[#71717A] ml-2 flex-shrink-0">{skill.percentage}%</span>
            </div>

            {/* Progress bar */}
            <div
              className="h-2 rounded-full overflow-hidden bg-[#111827]"
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${skill.percentage}%`,
                  backgroundColor: "#7C3AED",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
