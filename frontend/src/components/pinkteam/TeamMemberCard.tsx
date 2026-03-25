interface TeamMemberCardProps {
  MemberName?: string;
  MemberRole?: string;
  MemberImg?: string;
  MemberGithub?: string;
}

export default function TeamMemberCard(props: TeamMemberCardProps) {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
    
        <img className="card-img-top" src={props.MemberImg} alt={props.MemberName} />

        <div className="card-body">
      
          <h5 className="card-title">{props.MemberName}</h5>
          <p className="card-text">{props.MemberRole}</p>

        
          {props.MemberGithub && (
            <a
              href={props.MemberGithub}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </>
  );
}