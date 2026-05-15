
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  Avatar,
  Typography,
  Box,
  Button
} from "@mui/material";
interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  currentPlan: string;

  subscription?: {
    status: string;
    start_date: string;
    end_date: string;
    interviews_used: number;
    plan: {
      id: number;
      plan_name: string;
      price: number;
      interviews_limit: number;
    };
  } | null;

  stats: {
    interviewsCount: number;
    cvsCount: number;
    averageScore: number;
  };
}

function Profile() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    axios.get("http://localhost:3000/api/users/profile", {

      headers: {
        Authorization: `Bearer ${token}`
      }

    })

    .then((res) => {

      setUser(res.data);

    })

    .catch((err) => {

      console.log(err);

    });

  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8fbff, #eef4ff)",
        padding: "40px 20px"
      }}
    >

      {/* MAIN PROFILE CARD */}

      <Card
        sx={{
          maxWidth: 1100,
          margin: "80px auto 30px auto",
          borderRadius: 6,
          p: 5,
          boxShadow: 6,
          transition: "0.3s",

          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 10
          }
        }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexDirection: {
              xs: "column",
              md: "row"
            },
            textAlign: {
              xs: "center",
              md: "left"
            }
          }}
        >

          {/* AVATAR */}

          <Avatar
            sx={{
              width: 140,
              height: 140,
              fontSize: 70,
              bgcolor: "#1152d4",
              boxShadow: 4
            }}
          >
            {user.fullName.charAt(0).toUpperCase()}
          </Avatar>

          {/* USER INFO */}

          <Box>

            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: {
                  xs: "40px",
                  md: "60px"
                }
              }}
            >
              {user.fullName}
            </Typography>

            <Typography
              sx={{
                color: "#444",
                fontSize: "20px",
                mb: 1
              }}
            >
              <strong>Name:</strong> {user.fullName}
            </Typography>

            <Typography
              sx={{
                color: "#444",
                fontSize: "20px",
                mb: 1
              }}
            >
              <strong>Email:</strong> {user.email}
            </Typography>

            <Typography
              sx={{
                color: "#1152d4",
                // fontWeight: "bold",
                fontSize: "20px",
                mb: 1
              }}
            >
              <strong>Role:</strong> {user.role}
            </Typography>

            <Typography
              sx={{
                color: "#0f172a",
                // fontWeight: "bold",
                fontSize: "20px",
                mb: 3
              }}
            >
      <strong>Current Plan:</strong> {user.currentPlan || "Basic"}
            </Typography>

            <Button
              variant="contained"
              sx={{
                borderRadius: "30px",
                px: 4,
                py: 1.2,
                // fontWeight: "bold",
                textTransform: "none",
                background: "#306adf"
              }}
            >
              Edit Profile
            </Button>

          </Box>
{/* ROBOT IMAGE */}

<Box
  sx={{
    flex: 1,
    display: "flex",
    justifyContent: "center"
  }}
>
<img
  src="7.png"
  alt="AI Robot"
  style={{
    width: "100%",
    maxWidth: "520px",
    objectFit: "contain"
  }}
/>
</Box>
        </Box>

      </Card>

      {/* STATS SECTION */}

      <Box
        sx={{
          maxWidth: 1100,
          margin: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, 1fr)"
          },
          gap: 3
        }}
      >

        <Card
          sx={{
            p: 4,
            borderRadius: 5,
            textAlign: "center",
            boxShadow: 4
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#1152d4"
            }}
          >
           {user.stats?.interviewsCount}
          </Typography>

          <Typography sx={{ color: "#666" }}>
            Interviews Done
          </Typography>
        </Card>

        <Card
          sx={{
            p: 4,
            borderRadius: 5,
            textAlign: "center",
            boxShadow: 4
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#1152d4"
            }}
          >
           {user.stats?.cvsCount}
          </Typography>

          <Typography sx={{ color: "#666" }}>
            Uploaded CVs
          </Typography>
        </Card>

        <Card
          sx={{
            p: 4,
            borderRadius: 5,
            textAlign: "center",
            boxShadow: 4
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#1152d4"
            }}
          >
           {user.stats?.averageScore}%
          </Typography>

          <Typography sx={{ color: "#666" }}>
            AI Performance
          </Typography>
        </Card>

      </Box>

    </div>

  );

}

export default Profile;

