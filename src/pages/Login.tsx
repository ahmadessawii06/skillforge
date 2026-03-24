import React from "react";
import LeftPanel from "../components/common/login/LeftPanel";
import RightPanel from "../components/common/login/RightPanel";

export default function Login(): React.ReactElement {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        * { box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { margin: 0; }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        <LeftPanel />
        <RightPanel />
      </div>
    </>
  );
}