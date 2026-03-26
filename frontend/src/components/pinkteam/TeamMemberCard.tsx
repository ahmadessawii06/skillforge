interface TeamMemberCardProps {
  MemberName?: string;
  MemberRole?: string;
  MemberImg?: string;
  MemberGithub?: string;
}




export default function TeamMemberCard(props: TeamMemberCardProps) {
  return (
    <div className="card border-0 rounded-5 shadow-sm h-100 member-card " style={{ width: "100%", maxWidth: "18rem" }}>
      <div className="d-flex justify-content-center align-items-center" style={{ height: "220px" }}>
        <img
          className="rounded-circle member-img"   
          src={props.MemberImg}
          alt={props.MemberName}
          style={{
            width: "180px",   
            height: "180px",
            objectFit: "cover",
            transition: "all 0.4s ease" 
          }}
        />
      </div>

      <hr className="mx-4" />

      <div className="card-body">
        <h5 className="card-title fw-bold text-center">{props.MemberName}</h5>
        <p className="card-text fw-lighter text-center text-muted">{props.MemberRole}</p>

        {props.MemberGithub && (
          <div className="d-flex justify-content-center align-items-center">
            <a
              href={props.MemberGithub}
              className="btn btn-dark rounded-pill px-4 github-btn"     
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github fs-5 me-2"></i>
              <span className="fs-6 fw-bold">GitHub Profile</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}