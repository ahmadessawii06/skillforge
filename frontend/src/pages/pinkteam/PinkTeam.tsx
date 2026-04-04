import Card from "../../components/pinkteam/Card";
import "./PinkTeam.css";

const pinkTeamMembers = [
    {
        MemberName: "Ahmad Essawii",
        MemberRole: "Leader",
        MemberImg: "https://avatars.githubusercontent.com/u/233433829?v=4",
        MemberGithub: "https://github.com/ahmadessawii06",
    },
    {
        MemberName: "Muna Abusamra",
        MemberRole: "Co-Leader",
        MemberImg: "https://avatars.githubusercontent.com/u/232200397?v=4",
        MemberGithub: "https://github.com/Muna-Abusamra",
    },

    {
        MemberName: "Sara Madfa",
        MemberRole: "FrontEnd",
        MemberImg: "https://avatars.githubusercontent.com/u/232163396?v=4",
        MemberGithub: "https://github.com/saramadfa35",
    },

    {
        MemberName: "Islam Sharha",
        MemberRole: "BackEnd",
        MemberImg: "https://avatars.githubusercontent.com/u/232752391?v=4",
        MemberGithub: "https://github.com/islamali8112006",
    },

    {
        MemberName: "Noor Khwaihrh",
        MemberRole: "BackEnd",
        MemberImg: "https://avatars.githubusercontent.com/u/189617526?v=4",
        MemberGithub: "https://github.com/noorkh0090",
    },

    {
        MemberName: "Saif Abyzarour",
        MemberRole: "DataBase",
        MemberImg: "https://avatars.githubusercontent.com/u/231072668?v=4",
        MemberGithub: "https://github.com/saifabuzaroor",
    },
];

export default function PinkTeam() {
    return (
        <div className="container pinkteam-container">
            <h1 className="pinkteam-header">
                Pink Team - 6 Students From NNU - Lead By Ahmad Essawii
            </h1>
            <h2 className="pinkteam-subheader">
                Meet Our Team Members And Make A Difference With Them
            </h2>
            <h2 className="pinkteam-subheader">Supervised By: Eng. Wafa Adham</h2>
            <section className="row justify-content-center text-center">
                <div className="col-md-4 d-flex justify-content-center">
                    <Card
                        name="Ahmad Essawii"
                        role="Leader"
                        img="https://avatars.githubusercontent.com/u/233433829?v=4"
                        github="https://github.com/ahmadessawii06"
                    />
                </div>

                <div className="col-md-4 d-flex justify-content-center">
                    <Card
                        name="Muna Abusamra"
                        role="Co-Leader"
                        img="https://avatars.githubusercontent.com/u/232200397?v=4"
                        github="https://github.com/Muna-Abusamra"
                    />
                </div>
            </section>
            <Card
                name="Sara Madfa"
                role="FrontEnd"
                img="https://avatars.githubusercontent.com/u/232163396?v=4"
                github="https://github.com/saramadfa35"
            />
            <Card
                name="Islam Sharha"
                role="BackEnd"
                img="https://avatars.githubusercontent.com/u/232752391?v=4"
                github="https://github.com/islamali8112006"
            />
            <Card
                name="Noor Khwaihrh"
                role="BackEnd"
                img="https://avatars.githubusercontent.com/u/189617526?v=4"
                github="https://github.com/noorkh0090"
            />
            <Card
                name="Saif Abyzarour"
                role="DataBase"
                img="https://avatars.githubusercontent.com/u/231072668?v=4"
                github="https://github.com/saifabuzaroor"
            />
        </div>
    );
}
