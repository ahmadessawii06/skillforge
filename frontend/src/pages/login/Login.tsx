
import React from 'react';
import LeftPanel from '../../components/login/LeftPanel';
import RightPanel from '../../components/login/RightPanel';

const Login: React.FC = () => {
  return (
    <div style={{ 
        display: "flex", 
        minHeight: "100vh",
        marginTop: "-70px" 
      }}>
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default Login;