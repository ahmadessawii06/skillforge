import "./Card.css";

interface CardProps {
  name: string;
  role: string;
  img: string;
  github: string;
 
  isLeader?: boolean;
}

export default function Card({
  name,
  role,
  img,
  github,
  isLeader = false,
}: CardProps) {
  return (
    <article className="team-card">
      {isLeader && <span className="leader-badge">Leader</span>}

      <div className="avatar-wrapper">
        <img src={img} className="team-avatar" alt={name} />
      </div>

      <h3>{name}</h3>
      <p className="team-role">{role}</p>

      <div className="role-line"></div>

      

     <div className="social-links">
  <a href={github} target="_blank" rel="noopener noreferrer">
    <i className="fab fa-github"></i>
    <span>View GitHub </span>
  </a>
</div>
    </article>
  );
}