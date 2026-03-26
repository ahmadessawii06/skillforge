import TeamMemberCard from '../../components/pinkteam/TeamMemberCard'
import './PinkTeam.css';

const pinkTeamMembers = [


    {
        MemberName: "Islam",
        MemberRole: "Developer",
        MemberImg: "https://avatars.githubusercontent.com/u/232752391?v=4",
        MemberGithub: "https://github.com/islamali8112006"
    },

    {
        MemberName: "Ahmad",
        MemberRole: "Owner",
        MemberImg: "https://avatars.githubusercontent.com/u/233433829?v=4",
        MemberGithub: "https://github.com/ahmadessawii06"
    },

    {
        MemberName: "Sara",
        MemberRole: "Developer",
        MemberImg: "https://avatars.githubusercontent.com/u/232163396?v=4",
        MemberGithub: "https://github.com/saramadfa35"
    },
    {
        MemberName: "Saif",
        MemberRole: "Developer",
        MemberImg: "https://avatars.githubusercontent.com/u/231072668?v=4",
        MemberGithub: "https://github.com/saifabuzaroor"
    },
    {
        MemberName: "Muna",
        MemberRole: "Co-Owner",
        MemberImg: "https://avatars.githubusercontent.com/u/232200397?v=4",33
        MemberGithub: "https://github.com/Muna-Abusamra"
    }, {
        MemberName: "Noor",
        MemberRole: "Developer",
        MemberImg: "https://avatars.githubusercontent.com/u/189617526?v=4",
        MemberGithub: "https://github.com/noorkh0090"
    }
];

export default function PinkTeam() {
    return (
        <section className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="row g-4 ">
                {pinkTeamMembers.map((member, index) => (
                    <div className="col-12 col-md-4 d-flex justify-content-center bg-warning" key={index}>

                        <TeamMemberCard
                            MemberName={member.MemberName}
                            MemberRole={member.MemberRole}
                            MemberImg={member.MemberImg}
                            MemberGithub={member.MemberGithub}

                        />

                    </div>
                ))}
            </div>
        </section>
    );
}