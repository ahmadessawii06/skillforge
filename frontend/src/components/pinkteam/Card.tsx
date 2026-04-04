// interface TeamMemberCardProps {
//   MemberName?: string;
//   MemberRole?: string;
//   MemberImg?: string;
//   MemberGithub?: string;
// }


import "./Card.css";

interface cardProps {
  name: string;
  role: string;
  img: string;
  github: string;
}


export default function Card(props: cardProps) {
  return (
    <section className="container Card" >
      <div className="card" >
        <img className="card-img-top" src={props.img} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.role}</p>
          <a href={props.github} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>
        </div>
      </div>
    </section>

  );
}