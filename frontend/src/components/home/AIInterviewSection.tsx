import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

function AIInterviewSection() {
  return (
    <Box
      sx={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",

        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        mt: 11,
        py: 12,

        px: {
          xs: 4,
          md: 12
        },

        background:
          "linear-gradient(135deg, #edf4ff 0%, #dbeafe 50%, #eef4ff 100%)",

        borderRadius: "0px",

        overflow: "hidden",
        position: "relative",

        flexDirection: {
          xs: "column",
          md: "row"
        },

        gap: 6
      }}
    >
      {/* LEFT SIDE */}

      <Box sx={{ flex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            sx={{
              color: "#2563eb",
              background: "#edf4ff",
              display: "inline-block",
              px: 2,
              py: 1,
              borderRadius: "30px",
              fontSize: "14px",
              fontWeight: 600,
              mb: 3
            }}
          >
            AI-Powered Interview Practice
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "55px",
                md: "85px"
              },
              fontWeight: "bold",
              lineHeight: 1.1,
              color: "#0f172a",
              mb: 3,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            Ace Your Next <br />

            <span style={{ color: "#2563eb" }}>
              Interview
            </span>
          </Typography>
        </motion.div>

        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ amount: 0.3 }}
>
          <Typography
            sx={{
              fontSize: "22px",
              color: "#475569",
              maxWidth: "650px",
              lineHeight: 1.8,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            Practice with our AI interviewer and improve your
            communication, confidence, and technical skills
            through realistic mock interviews and instant
            smart feedback.
          </Typography>
        </motion.div>

      </Box>

      {/* RIGHT SIDE */}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center"
        }}
      >
       <motion.img
  src="8.png"
  alt="AI Interview"
  initial={{ opacity: 0, x: 100 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  viewport={{ amount: 0.3 }}
  style={{
    width: "100%",
    maxWidth: "650px",
    objectFit: "contain"
  }}
/>
      </Box>
    </Box>
  );
}

export default AIInterviewSection;