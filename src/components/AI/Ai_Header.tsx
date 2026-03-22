export function Ai_Header() {
  return (
    <>
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
    </>
  );
}
