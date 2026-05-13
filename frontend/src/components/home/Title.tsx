
const Title = () => {
  return (
    <div
      className="text-center"
      style={{
        marginTop: '120px',
        marginBottom: '80px'
      }}
    >

      {/* Top Small Text */}
      <p
        style={{
          color: '#2563eb',
          fontWeight: '900',
          letterSpacing: '3px',
          marginBottom: '18px',
         
          fontSize: '2.8rem',
          fontFamily: 'Montserrat, sans-serif'
        }}
      >
   THE FIRST AI-POWERED INTERVIEW PLATFORM
      </p>

      {/* Main Title */}
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
  );
};

export default Title;