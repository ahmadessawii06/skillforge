import 'bootstrap/dist/css/bootstrap.min.css';

const SkillProgress = () => {
  const skills = [
    { name: "Technical Knowledge", percentage: 0},
    { name: "Problem Solving", percentage: 0},
    { name: "Communication", percentage: 0},
    { name: "Behavioral Responses", percentage: 0},
  ];

  return (
    <div className="bg-white rounded-3 border p-4" style={{ borderColor: '#e5e7eb' }}>
      <h2 className="h6 fw-bold text-dark mb-1">Skill Progress</h2>
      <p className="small text-secondary mb-4">Your performance across key areas</p>

      <div className="d-flex flex-column gap-4">
        {skills.map((skill, idx) => (
          <div key={idx}>
            {/* Skill name and percentage */}
            <div className="d-flex justify-content-between fw-bold text-dark mb-1 small">
              <span>{skill.name}</span>
              <span>{skill.percentage}%</span>
            </div>

            {/* Progress bar */}
            <div className="progress" style={{ height: '10px', borderRadius: '8px', backgroundColor: '#f1f5f9' }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${skill.percentage}%`, backgroundColor: '#1e293b' }}
                aria-valuenow={skill.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillProgress;