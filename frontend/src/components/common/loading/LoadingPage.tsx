import "bootstrap/dist/css/bootstrap.min.css";
import "./LoadingPage.css";

export default function LoadingPage() {
    return (
        <main className="loading-page d-flex align-items-center justify-content-center overflow-hidden">
            <div className="text-center">
                <div className="loading-icon mb-3">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#346db9" />
                        <circle cx="12" cy="12" r="3" fill="#346db9" />
                        <path d="M12 6V2M12 22V18M6 12H2M22 12H18M16.24 7.76L18.36 5.64M5.64 18.36L7.76 16.24M16.24 16.24L18.36 18.36M5.64 5.64L7.76 7.76" stroke="#346db9" strokeWidth="1" />
                    </svg>
                </div>
                <h1 className="gap-1 mx-auto p-5 loading-title" style={{ fontFamily: "Pacifico", color: "#346db9", fontWeight: "bold" }}>SkillForge</h1>
                <div className="loading-bar d-flex align-items-center gap-1 mx-auto p-1">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="loading-block flex-fill"
                            style={{ animationDelay: `${index * 120}ms` }}
                        />
                    ))}
                </div>
                <h1 className="loading-subtitle mt-4 mb-0 fw-black">Forging Your Skills... Please Wait</h1>
            </div>
        </main>
    );
}