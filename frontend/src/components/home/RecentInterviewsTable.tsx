export default function RecentInterviewsTable() {
  const interviews = [
    { date: "-", time: "-", role: "No Data Yet", score: 0 },
    { date: "-", time: "-", role: "No Data Yet", score: 0 },
    { date: "-", time: "-", role: "No Data Yet", score: 0 },
  ];

  return (
    <div className="bg-[#1E293B] border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 sm:p-5 border-b border-white/[0.06]">
        <h2 className="font-bold text-white text-base sm:text-lg mb-0">Recent Interviews</h2>
        <button className="text-[#7C3AED] font-semibold text-sm hover:text-[#6D28D9] transition-colors min-w-[60px] sm:min-w-auto">
          View All
        </button>
      </div>

      {/* Desktop/Tablet - Table View */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-medium text-[#71717A] uppercase">
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Score</th>
                <th className="text-right py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview, idx) => (
                <tr key={idx} className="border-t border-white/[0.06]">
                  <td className="py-3 px-4">
                    <div className="font-medium text-white text-sm">{interview.date}</div>
                    <div className="text-xs text-[#71717A]">{interview.time}</div>
                  </td>
                  <td className="py-3 px-4 text-white text-sm">{interview.role}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="flex-1 mr-2 h-1.5 bg-[#111827] rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${interview.score}%`,
                            backgroundColor: "#7C3AED",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4">
                    <button className="text-sm font-semibold text-[#7C3AED] hover:text-[#6D28D9] transition-colors min-h-[36px] px-3">
                      View Results
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile - Card View */}
      <div className="md:hidden">
        {interviews.map((interview, idx) => (
          <div key={idx} className="border-t border-white/[0.06] p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-medium text-white text-sm">{interview.date}</div>
                <div className="text-xs text-[#71717A]">{interview.time}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#71717A] mb-1">Score</div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-[#111827] rounded-full">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${interview.score}%`,
                        backgroundColor: "#7C3AED",
                      }}
                    />
                  </div>
                  <span className="text-xs text-[#71717A]">{interview.score}%</span>
                </div>
              </div>
            </div>
            <div className="text-white text-sm mb-3">{interview.role}</div>
            <button className="w-full py-2.5 rounded-lg font-semibold text-[#7C3AED] bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 transition-colors text-sm">
              View Results
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
