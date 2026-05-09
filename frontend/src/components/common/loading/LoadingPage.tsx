export default function LoadingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] flex items-center justify-center overflow-hidden">
      <div className="text-center">
        <div className="mb-8">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#7C3AED" />
            <circle cx="12" cy="12" r="3" fill="#7C3AED" />
            <path d="M12 6V2M12 22V18M6 12H2M22 12H18M16.24 7.76L18.36 5.64M5.64 18.36L7.76 16.24M16.24 16.24L18.36 18.36M5.64 5.64L7.76 7.76" stroke="#7C3AED" strokeWidth="1" />
          </svg>
        </div>
        <h1 className="mx-auto mb-6" style={{ fontFamily: "Pacifico", color: "#7C3AED", fontWeight: "bold" }}>
          SkillForge
        </h1>
        <div className="loader mx-auto">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="loader-bar"
              style={{ animationDelay: `${index * 120}ms` }}
            />
          ))}
        </div>
        <h1 className="text-white font-bold mt-6 mb-0">Forging Your Skills... Please Wait</h1>
      </div>
    </main>
  );
}
