import TeamMemberCard from '../../components/pinkteam/TeamMemberCard'
import './PinkTeam.css';

const pinkTeamMembers = [




    {
        MemberName: "Ahmad Essawii",
        MemberRole: "Leader",
        MemberImg: "https://avatars.githubusercontent.com/u/233433829?v=4",
        MemberGithub: "https://github.com/ahmadessawii06"
    },
    {
        MemberName: "Muna Abusamra",
        MemberRole: "Co-Leader",
        MemberImg: "https://avatars.githubusercontent.com/u/232200397?v=4",
        MemberGithub: "https://github.com/Muna-Abusamra"
    },



    {
        MemberName: "Sara Madfa",
        MemberRole: "FrontEnd",
        MemberImg: "https://avatars.githubusercontent.com/u/232163396?v=4",
        MemberGithub: "https://github.com/saramadfa35"
    },

    {
        MemberName: "Islam Sharha",
        MemberRole: "BackEnd",
        MemberImg: "https://avatars.githubusercontent.com/u/232752391?v=4",
        MemberGithub: "https://github.com/islamali8112006"
    },

    {
        MemberName: "Noor Khwihrh",
        MemberRole: "BackEnd",
        MemberImg: "https://avatars.githubusercontent.com/u/189617526?v=4",
        MemberGithub: "https://github.com/noorkh0090"
    },

    {
        MemberName: "Saif Abyzarour",
        MemberRole: "DataBase",
        MemberImg: "https://avatars.githubusercontent.com/u/231072668?v=4",
        MemberGithub: "https://github.com/saifabuzaroor"
    },

];

export default function PinkTeam() {

    const leaders = pinkTeamMembers.slice(0, 2);
    const members = pinkTeamMembers.slice(2);

    return (
        <section className="container mt-3  "
            // style={{
            //     backgroundImage: "url('/LogoNoBg.png')",
            //     backgroundRepeat: "no-repeat",
            //     backgroundPosition: "center",
            //     backgroundSize: "120%",
            //     position: "relative",
            // }}
            >


            
            {/* Leaders */}
            <div className="row justify-content-center " >
                {leaders.map((member, index) => (
                    <div
                        className="col-12 col-md-4 col-lg-3 d-flex justify-content-center mb-4"
                        key={index}
                    >
                        <TeamMemberCard {...member} />
                    </div>
                ))}
            </div>

            {/* Members */}
            <div className="row justify-content-center">
                {members.map((member, index) => (
                    <div
                        className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4"
                        key={index}
                    >
                        <TeamMemberCard {...member} />
                    </div>
                ))}
            </div>

        </section>
    );
}