
export default function Ai() {
  return (

    <>
      {/* Ai-Header */}
      <section className="bg-light d-flex justify-content-between p-3 border-bottom border-dark border-5 border-top border-dark border-dark">
        <div className="d-flex flex-column align-items-start rounded mx-3 ">
          <h1 className="fs-5 fw-bold">Interview in Progress</h1>
          <h2 className="fs-6 text-muted">Questions 5 of 5</h2>
        </div>
        <div className="d-flex flex-column align-items-end rounded text-end mx-3 ">
          <h1 className="fs-5 fw-bold text-muted">TIME REMAINING</h1>
          <h2 className="fs-4 text-success me-3">
            {" "}
            05:00 <span className="text-dark">/</span>{" "}
            <span className=" text-danger">02:26</span>{" "}
          </h2>
        </div>
      </section>

      {/* Ai-Q */}
      <div className="bg-white rounded-5 shadow-sm border p-4 p-xl-5 m-3">
        <div className="d-flex gap-2 mb-4 flex-wrap">
          <span className="badge bg-secondary">Teamwork</span>
          <span className="badge bg-success">Easy</span>
          <span className="badge bg-secondary">Behavioral</span>
        </div>

        <h2 className="h5 fw-bold mb-4">Question 5</h2>

        <p className="fs-5">
          Describe a situation where you had to work with a difficult team member.
          How did you handle it?
        </p>
      </div>


      {/* Ai-Answer */}
      <section className=" bg-white w-220 h-100 rounded-5 shadow-sm border p-4 p-xl-5 m-3 ">
        <h4 className="mb-4">Your Answer</h4>
        <textarea
          className="w-100 form-control "
          placeholder="Type your answer here... Be Specific and provide examples where possible. "
          style={{ height: "200px" }}
        />
        <div className="bg-danger bg-opacity-10 mt-3 rounded-3 shadow-sm border p-xl-5 ">
          <h5 className="mx-3 my-3 fw-bold">NOTES:</h5>
          <ul>
            <li>
              {" "}
              <p>Use the STAR method - Situation, Task, Action, Result. </p>
            </li>
            <li>
              {" "}
              <p>Don't Use AI :).</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

