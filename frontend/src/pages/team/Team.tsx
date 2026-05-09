import Card from "../../components/team/Card";

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
    name: "Islam Sharh",
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

export default function Team() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-16 sm:pt-20 lg:pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4 px-2">
            Pink&apos;s Team - 6 Students From NNU
          </h1>
          <h2 className="text-sm sm:text-base md:text-lg text-[#A1A1AA] mb-2 px-2 leading-relaxed">
            Meet our team members and make a difference with them
          </h2>
          <h2 className="text-sm sm:text-base md:text-lg text-[#A1A1AA] px-2 leading-relaxed">
            Supervised By: Eng. Wafa Adham
          </h2>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {pinkTeamMembers.map((member) => (
            <Card
              key={member.id}
              name={member.name}
              role={member.role}
              img={member.img}
              github={member.github}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
