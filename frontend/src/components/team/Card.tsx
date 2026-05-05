import "./Card.css";

interface CardProps {
  name: string;
  role: string;
  img: string;
  github: string;
}

export default function Card({ name, role, img, github }: CardProps) {
  return (
    <div className="card team-card shadow-sm h-100">
      <img src={img} className="card-img-top team-img" alt={name} />
      <div className="card-body text-center">
        <h5 className="card-title mb-2 mt-3">{name}</h5>
        <p className="card-text text-muted">{role}</p>
        <a
          href={github}
          className="btn btn-outline-dark github-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
         <i className="fab fa-github me-2 "></i><span>View GitHub</span>  
        </a>
      </div>
    </div>
  );
}