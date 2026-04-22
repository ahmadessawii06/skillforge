import 'bootstrap/dist/css/bootstrap.min.css';

const RecentInterviewsTable = () => {
  const interviews = [
    { date: "Oct 24, 2023", time: "10:30 AM", role: "Senior React Engineer", score: 88, color: "bg-success" },
    { date: "Oct 22, 2023", time: "02:15 PM", role: "Full Stack Developer", score: 76, color: "bg-primary" },
    { date: "Oct 19, 2023", time: "09:00 AM", role: "System Design Expert", score: 62, color: "bg-warning" },
  ];

  return (
    <div className="bg-white rounded-3 border overflow-hidden">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom" style={{ borderColor: '#f1f5f9' }}>
        <h2 className="fw-bold mb-0 text-dark">Recent Interviews</h2>
        <button className="btn btn-link fw-bold p-0 text-primary text-decoration-none">View All</button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table mb-0 align-middle">
          <thead className="table-light text-uppercase small text-secondary">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Role</th>
              <th scope="col">Score</th>
              <th scope="col" className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview, idx) => (
              <tr key={idx} className="align-middle">
                {/* Date & Time */}
                <td>
                  <div className="fw-medium text-dark">{interview.date}</div>
                  <div className="small text-muted">{interview.time}</div>
                </td>

                {/* Role */}
                <td className="text-dark">{interview.role}</td>

                {/* Score with progress bar */}
                <td>
                  <div className="d-flex align-items-center">
                    <div className="progress flex-grow-1 me-2" style={{ height: '6px', borderRadius: '4px' }}>
                      <div
                        className={`progress-bar ${interview.color}`}
                        role="progressbar"
                        style={{ width: `${interview.score}%` }}
                        aria-valuenow={interview.score}
                        aria-valuemin={0}       // <-- غيرنا من "0" لرقم 0
                      aria-valuemax={100}
                      ></div>
                    </div>
                    <span className="fw-bold small text-dark">{interview.score}%</span>
                  </div>
                </td>

                {/* Action button */}
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary fw-bold">View Results</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentInterviewsTable;