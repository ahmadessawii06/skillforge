import Card from "../../components/team/Card";
import "./Team.css";

const pinkTeamMembers = [
  {
    id: 1,
    name: "Ahmad Essawii",
    role: "Leader",
    img: "https://avatars.githubusercontent.com/u/233433829?v=4",
    github: "https://github.com/ahmadessawii06",
  },
  {
    id: 2,
    name: "Muna Abusamra",
    role: "Co-Leader",
    img: "https://avatars.githubusercontent.com/u/232200397?v=4",
    github: "https://github.com/Muna-Abusamra",
  
  },
  {
    id: 3,
    name: "Sara Madfa",
    role: "FrontEnd",
    img: "https://avatars.githubusercontent.com/u/232163396?v=4",
    github: "https://github.com/saramadfa35",
 
  },
  {
    id: 4,
    name: "Islam Sharha",
    role: "BackEnd",
    img: "https://avatars.githubusercontent.com/u/232752391?v=4",
    github: "https://github.com/islamali8112006",

  },
  {
    id: 5,
    name: "Noor Khwaireh",
    role: "BackEnd",
    img: "https://avatars.githubusercontent.com/u/189617526?v=4",
    github: "https://github.com/noorkh0090",

  },
  {
    id: 6,
    name: "Saif Abuzarour",
    role: "Database",
    img: "https://avatars.githubusercontent.com/u/231072668?v=4",
    github: "https://github.com/saifabuzaroor",
   
  },
];

export default function PinkTeam() {
  return (
    <main className="team-page">
      <section className="team-hero">
        <div>
          <h1>
            Meet The Minds <br />
            Behind <span>SkillForge</span>
          </h1>

          <p>
            We are a team of passionate computer science students building the
            future of AI-powered interview training.
          </p>

          <div className="supervisor-badge">
            Supervised By: <strong>Eng. Wafa Adham</strong>
          </div>
        </div>

      <div className="hero-visual">
  <img
    src="./hero4.png"
    alt="SkillForge AI"
    className="hero-brain"
  />
</div>
      </section>

      <section className="team-section">
     

        <div className="team-grid">
          {pinkTeamMembers.map((member) => (
            <Card
              key={member.id}
              name={member.name}
              role={member.role}
              img={member.img}
              github={member.github}
              isLeader={member.role === "Leader"}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
