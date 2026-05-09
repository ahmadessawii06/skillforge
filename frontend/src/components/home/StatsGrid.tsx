const stats = [
  {
    label: "Overall Score",
    value: 0,
    suffix: "/100",
    badge: "—",
    progress: 0,
  },
  {
    label: "Interviews Completed",
    value: 0,
    suffix: "",
    badge: "—",
    isCount: true,
  },
  {
    label: "Success Rate",
    value: 0,
    suffix: "%",
    badge: "—",
    isRate: true,
  },
  {
    label: "Area of Improvement",
    value: "—",
    suffix: "",
    isImprovement: true,
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-3 md:gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#1E293B] border border-white/[0.06] rounded-xl sm:rounded-2xl p-4 sm:p-5 min-h-[140px] sm:min-h-[160px] flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm text-[#A1A1AA] mb-0 font-medium leading-snug">{stat.label}</p>
            <span className="text-xs font-bold text-[#71717A] bg-[#111827] px-2 py-0.5 rounded sm:rounded-md flex-shrink-0 ml-2">
              {stat.badge}
            </span>
          </div>

          {stat.isImprovement ? (
            <h3 className="font-bold text-xl sm:text-2xl text-[#71717A] mb-0">
              {stat.value}
            </h3>
          ) : (
            <>
              <div className="flex items-end gap-2 flex-wrap">
                <h3 className="font-bold text-2xl sm:text-3xl text-white mb-0 break-all">
                  {stat.value}
                  {!stat.isRate && (
                    <span className="text-base sm:text-lg font-normal text-[#71717A]">
                      {stat.suffix}
                    </span>
                  )}
                </h3>
                {stat.isRate && (
                  <span className="text-base sm:text-lg font-normal text-[#71717A] mb-1">
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Progress bar for Overall Score */}
              {index === 0 && (
                <div
                  className="mt-3 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "#111827" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${stat.progress}%`,
                      backgroundColor: "#7C3AED",
                    }}
                  />
                </div>
              )}

              {/* Segmented bar for Success Rate */}
              {stat.isRate && (
                <div className="flex gap-1 h-2 mt-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-[#111827] rounded"
                    />
                  ))}
                </div>
              )}

              {!stat.isRate && stat.suffix !== "%" && (
                <p className="text-xs sm:text-sm text-[#71717A] mt-2 mb-0 leading-snug">
                  {stat.value === 0 ? "Start your first interview" : ""}
                </p>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
