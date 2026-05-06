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
        <div className=" py-5 pinkteam-container"  style={{ marginTop: "100px" }}>
            <div className="text-center mb-5">
                <h1 className="pinkteam-header m-5">
                    Pink's Team - 6 Students From NNU
                </h1>
                <h2 className="pinkteam-subheader">
                    Meet our team members and make a difference with them
                </h2>
                <h2 className="pinkteam-subheader">
                    Supervised By: Eng. Wafa Adham
                </h2>
            
            </div>

            <div className="row g-3 justify-content-center px-5">
                {pinkTeamMembers.map((member) => (
                    <div key={member.id} className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center">
                        <Card
                            name={member.name}
                            role={member.role}
                            img={member.img}
                            github={member.github}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}