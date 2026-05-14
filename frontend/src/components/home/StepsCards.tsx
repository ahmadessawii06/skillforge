
const StepsCards = () => {
  const steps = [
    {
      id: 1,
      title: "Upload Your CV",
      description:
        "Upload your resume and let AI analyze your experience and skills.",
      image:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },

    {
      id: 2,
      title: "Start AI Interview",
      description:
        "Practice realistic mock interviews powered by artificial intelligence.",
      image:
        "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    },

    {
      id: 3,
      title: "Get Smart Feedback",
      description:
        "Receive personalized feedback and detailed performance analysis.",
      image:
        "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
    },

    {
      id: 4,
      title: "Improve Your Skills",
      description:
        "Track your progress and improve your confidence step by step.",
      image:
        "https://cdn-icons-png.flaticon.com/512/2784/2784445.png",
    },
  ];

  return (



    <div className="container-fluid mt-5">

      {/* Main Title */}
      <div className="text-center mb-5">
        <h2
          style={{
            fontSize: 'clamp(2.0rem, 4vw, 2rem)',
            fontWeight: '700',
            color: '#111827',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '20px'
          }}
        >
          How It Works?
        </h2>

        {/* Description */}
        <p
          style={{
            color: '#6b7280',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            maxWidth: '750px',
            margin: '0 auto',
            fontFamily: 'Montserrat, sans-serif'
          }}
        >
          Upload your CV, start realistic AI-powered interviews,
          and receive smart personalized feedback to improve
          your confidence, communication, and technical skills.
        </p>
      </div>

      <div className="row g-4">

        {steps.map((step) => (

          <div
            key={step.id}
            className="col-12 col-sm-6 col-lg-3"
          >

            <div
              className="h-100 text-center"
              style={{
                backgroundColor: "white",
                borderRadius: "28px",
                padding: "35px 25px",

                border: "1px solid #e5e7eb",

                transition: "0.3s ease",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.04)"
              }}
            >

              {/* Image */}
              <img
                src={step.image}
                alt={step.title}
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "contain",
                  marginBottom: "25px"
                }}
              />

              {/* Title */}
              <h4
                style={{
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: "15px",
                  fontFamily: "Poppins, sans-serif"
                }}
              >
                {step.title}
              </h4>

              {/* Description */}
              <p
                style={{
                  color: "#6b7280",
                  lineHeight: "1.7",
                  fontSize: "0.95rem",
                  fontFamily: "Montserrat, sans-serif"
                }}
              >
                {step.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default StepsCards;