export function Ai_Answer() {
  return (
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
  );
}
