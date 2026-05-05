import "bootstrap/dist/css/bootstrap.min.css";
import "./LoadingPage.css";

export default function LoadingPage() {
    return (
        <main className="loading-page d-flex align-items-center justify-content-center overflow-hidden">
            <div className="text-center">

                <h1 className="gap-1 mx-auto p-5" style={{ fontFamily: "Pacifico", color: "#346db9" ,fontWeight: "bold"}}>SkillForge</h1>
                <div className="loading-bar d-flex align-items-center gap-1 mx-auto p-1">

                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="loading-block flex-fill"
                            style={{ animationDelay: `${index * 120}ms` }}
                        />
                    ))}
                </div>

                <h1 className="loading-title mt-4 mb-0 fw-black">SkillForge Is Generating Questions Please Wait...</h1>

            </div>


        </main>
    );
}