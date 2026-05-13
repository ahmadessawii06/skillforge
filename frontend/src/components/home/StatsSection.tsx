import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const stats = [
  {
    number: 10,
    suffix: "K+",
    title: "Interviews Completed"
  },

  {
    number: 5,
    suffix: "K+",
    title: "Uploaded CVs"
  },

  {
    number: 92,
    suffix: "%",
    title: "Success Rate"
  },

  {
    number: 24,
    suffix: "/7",
    title: "AI Support"
  }
];

function StatsSection() {
  return (
    <Box
      sx={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",

        py: 8,

        background: "#fff",

        borderTop: "1px solid #e5e7eb",
        borderBottom: "1px solid #e5e7eb"
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "auto",

          display: "grid",

          gridTemplateColumns: {
            xs: "repeat(2,1fr)",
            md: "repeat(4,1fr)"
          },

          gap: 4,

          textAlign: "center",

          px: {
            xs: 3,
            md: 6
          }
        }}
      >
        {stats.map((item, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2
            }}
            viewport={{ amount: 0.3 }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "35px",
                  md: "45px"
                },
fontFamily: "Inter, sans-serif",
                fontWeight: "bold",

                color: "#0f172a",

                mb: 1
              }}
            >
              {item.number}

              {item.suffix}
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                fontSize: "16px",
                letterSpacing: "0.5px"
              }}
            >
              {item.title}
            </Typography>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}

export default StatsSection;