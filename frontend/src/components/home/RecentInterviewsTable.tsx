import 'bootstrap/dist/css/bootstrap.min.css';

const RecentInterviewsTable = () => {
 const interviews = [
  { date: "-", time: "-", role: "No Data Yet", score: 0 },
  { date: "-", time: "-", role: "No Data Yet", score: 0 },
  { date: "-", time: "-", role: "No Data Yet", score: 0 },
];


  return (
    <div className="bg-white rounded-3 border">
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h2 className="fw-bold mb-0 text-dark">Recent Interviews</h2>
        <button className="btn btn-link fw-bold p-0 text-primary text-decoration-none">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table mb-0 align-middle">
          <thead className="table-light text-uppercase small text-secondary">
            <tr>
              <th>Date</th>
              <th>Role</th>
              <th>Score</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>

          <tbody>
            {interviews.map((interview, idx) => (
              <tr key={idx} className="align-middle">
                
                {/* Date */}
                <td>
                  <div className="fw-medium text-dark">{interview.date}</div>
                  <div className="small text-muted">{interview.time}</div>
                </td>

                {/* Role */}
                <td className="text-dark">{interview.role}</td>

                {/* Score */}
                <td>
                  <div className="d-flex align-items-center">
                    
                    <div className="progress flex-grow-1 me-2" style={{ height: '6px' }}>
                      <div
                        className="progress-bar"
                        style={{
                          width: interview.score,
                          height: '6px',
                          borderRadius: '6px',
                          backgroundColor: "#1e6de0" // 🔥 لون أزرق
                        }}
                      ></div>
                    </div>

                    <span className="fw-bold small text-dark">
                     
                    </span>
                  </div>
                </td>

                {/* Button */}
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary fw-bold">
                    View Results
                  </button>
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