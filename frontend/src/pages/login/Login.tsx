import React, { useState, useEffect } from 'react';
import LeftPanel from '../../components/login/LeftPanel';
import RightPanel from '../../components/login/RightPanel';

const Login: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <div style={{ 
            display: "flex", 
            minHeight: "100vh",
            flexDirection: isMobile ? "column" : "row",
        }}>
            {!isMobile && <LeftPanel />}
            <RightPanel />
        </div>
    );
};

export default Login;