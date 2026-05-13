import {
  Box,
  Typography,
  Card
} from "@mui/material";

import { motion } from "framer-motion";
const videos = [
  {
    title: "Tell Me About Yourself",
    channel: "CareerVidz",
    image:
      "https://img.youtube.com/vi/V36kSqwjaaw/maxresdefault.jpg",

    link:
      "https://www.youtube.com/watch?v=V36kSqwjaaw"
  },

  {
    title: "Top 10 Interview Questions",
    channel: "CareerVidz",
    image:
      "https://img.youtube.com/vi/1mHjMNZZvFo/maxresdefault.jpg",

    link:
      "https://www.youtube.com/watch?v=1mHjMNZZvFo"
  },

  {
    title: "Body Language For Interviews",
    channel: "Charisma On Command",
    image:
      "https://img.youtube.com/vi/Ks-_Mh1QhMc/maxresdefault.jpg",

    link:
      "https://www.youtube.com/watch?v=Ks-_Mh1QhMc"
  },

  {
    title: "How To Answer HR Questions",
    channel: "Work It Daily",
    image:
      "https://img.youtube.com/vi/6bJTEZnTT5A/maxresdefault.jpg",

    link:
      "https://www.youtube.com/watch?v=6bJTEZnTT5A"
  },

  {
    title: "Common Interview Mistakes",
    channel: "The Careers Guru",
    image:
      "https://img.youtube.com/vi/Ji46s5BHdr0/maxresdefault.jpg",

    link:
      "https://www.youtube.com/watch?v=Ji46s5BHdr0"
  },

  {
    title: "Technical Interview Tips",
    channel: "Simplilearn",
    image:
      "https://img.youtube.com/vi/HG68Ymazo18/maxresdefault.jpg",

    link:
      "https://www.youtube.com/watch?v=HG68Ymazo18"
  },

  {
    title: "How To Speak Confidently",
    channel: "Self Made Millennial",
    image:
      "https://img.youtube.com/vi/a2MR5XbJtXU/maxresdefault.jpg",

    link:
      "https://www.youtube.com/watch?v=a2MR5XbJtXU"
  },

  

  {
    title: "Interview Tips For Freshers",
    channel: "CareerVidz",
    image:
      "https://img.youtube.com/vi/oVVdezJ0e7w/maxresdefault.jpg",

    link:
      "https://www.youtube.com/watch?v=oVVdezJ0e7w"
  }
];

function VideoSection() {
  return (
    <Box
      sx={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",

        pt: 7,
    pb: 0,
    mb: 0,

        background:
          "linear-gradient(to bottom, #ffffff, #eef4ff)"
      }}
    >
      {/* TITLE */}

      <Box
        sx={{
          textAlign: "center",
          mb: 7,
          px: 3
        }}
      >
        <Typography
          sx={{
            color: "#2563eb",
            fontWeight: 700,
            fontSize: "15px",
            mb: 2,
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          INTERVIEW LEARNING HUB
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "40px",
              md: "58px"
            },

            fontWeight: "bold",

            color: "#0f172a",

            mb: 2,
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          Learn From Interview Experts
        </Typography>

        <Typography
          sx={{
            color: "#64748b",
            fontSize: "20px",
            maxWidth: "800px",
            margin: "auto",
            lineHeight: 1.8,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Explore professional interview tips,
          communication skills, and real-world
          interview strategies from top career experts.
        </Typography>
      </Box>

      {/* VIDEOS */}

      <Box
        sx={{
          display: "flex",
          gap: 3,

          overflowX: "auto",

          px: 5,

          "&::-webkit-scrollbar": {
            height: "8px"
          },

          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e1",
            borderRadius: "20px"
          }
        }}
      >
        {videos.map((video, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: index * 0.15
            }}
            viewport={{ amount: 0.2 }}
          >
          <Card
           component="a"
  href={video.link}
  target="_blank"
  sx={{
    minWidth: "320px",

    height: "100%",

    display: "flex",
    flexDirection: "column",

    borderRadius: "25px",

    overflow: "hidden",
textDecoration: "none",
color: "inherit",
    boxShadow:
      "0 10px 30px rgba(37,99,235,0.08)",

    transition: "0.3s",

    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow:
        "0 20px 40px rgba(37,99,235,0.15)"
    }
  }}
>
              {/* IMAGE */}

              <Box
                component="img"
                src={video.image}
                alt={video.title}
                sx={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover"
                }}
              />

              {/* CONTENT */}

              <Box
  sx={{
    p: 3,
    flexGrow: 1
  }}
>

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "22px",
                    color: "#0f172a",
                    mb: 1
                  }}
                >
                  {video.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#ffffff",
                    fontSize: "16px"
                  }}
                >
                  {video.channel}
                </Typography>

              </Box>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}

export default VideoSection;