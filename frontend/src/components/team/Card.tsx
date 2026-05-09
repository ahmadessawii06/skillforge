interface CardProps {
  name: string;
  role: string;
  img: string;
  github: string;
}

export default function Card({ name, role, img, github }: CardProps) {
  return (
    <div className="bg-[#1E293B] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[#7C3AED]/50 transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative pt-[100%] overflow-hidden">
        <img
          src={img}
          alt={name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        <h5 className="text-sm sm:text-base font-bold text-white mb-1 leading-tight">{name}</h5>
        <p className="text-xs sm:text-sm text-[#A1A1AA] mb-3">{role}</p>
        <a
          href={github}
          className="inline-flex items-center px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border border-white/[0.2] text-[#A1A1AA] hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all min-h-[40px] touch-target"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github mr-2 text-sm"></i>
          View GitHub
        </a>
      </div>
    </div>
  );
}
