
import React from 'react';
import LeftPanel from '../../components/login/LeftPanel';
import RightPanel from '../../components/login/RightPanel';

const Login: React.FC = () => {
  return (

      <div className="row g-0">
        <div className="col-12 col-md-6">      <LeftPanel/> </div>
        <div className="col-12 col-md-6">       <RightPanel /> </div>

      </div>
  );
};

export default Login;