    // import "bootstrap/dist/css/bootstrap.min.css";
    // import "./LoadingPage.css";
    // export default function LoadingPage() {
    //   return (
    //     <main className="loading-page d-flex align-items-center justify-content-center overflow-hidden">
    //       <div className="loading-card text-center">

    //         <h1 className="loading-title mb-3">
    //           SkillForge
    //         </h1>

    //         <div className="loading-bar mx-auto">
    //           <div className="loading-progress" />
    //         </div>

    //         <p className="loading-subtitle mt-4 mb-0">
    //          Preparing Your AI Interview Experience
    //         </p>

    //       </div>
    //     </main>
    //   );
    // }


    import "bootstrap/dist/css/bootstrap.min.css";
    import "./LoadingPage.css";




    import { useEffect, useState } from "react";
    import "bootstrap/dist/css/bootstrap.min.css";
    import "./LoadingPage.css";

    export default function LoadingPage() {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowLoader(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    

    return (
        <main className="loading-page d-flex align-items-center justify-content-center overflow-hidden">
        <div className="loading-bg-glow glow-one" />
        <div className="loading-bg-glow glow-two" />
        <div className="scan-line" />

        <div className="loading-content text-center">
            

            <h1 className="loading-title">
            SkillForge
            </h1>

            <p className="loading-tagline mb-4">
            Preparing Your AI Interview Experience
            </p>

            <div className="ai-loader mx-auto">
            <div className="ai-loader-line" />
            </div>

            <p className="loading-subtitle mt-4 mb-0">
            Analyzing your career path...
            </p>
        </div>
        </main>
    );
    }