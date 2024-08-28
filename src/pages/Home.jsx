import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import NavigationBar from "../components/NavigationBar";
import { Link } from 'react-router-dom';
import axios from "axios";

function ProfessionalLandingPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/user/user-info", { withCredentials: true })
      .then(response => {
        setUser(response.data);
        localStorage.setItem("user",user);
        console.log(user);
      })
      .catch(error => {
        console.error("Error occurred", error);
      });
  }, []);

  return (
    <>
      <NavigationBar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        padding="4rem"
        sx={{
          color: "#212529",
          background: "linear-gradient(to bottom, #FFFBF5, #36C2CE)",
        }}
      >
        <Typography
          variant="h2"
          sx={{ marginBottom: "1rem", fontWeight: "bold", textAlign: "center" }}
        >
          Welcome to <br />
          Online Quizz Portal
        </Typography>
        <Typography
          variant="h4"
          sx={{ marginBottom: "1rem", textAlign: "center" }}
        >
          Find the Perfect Quiz for You
        </Typography>

        <Link to="/takeQuizz" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4535C1",
              padding: "0.5rem 2rem",
              fontSize: "1.2rem",
            }}
          >
            Take a Quiz Now!
          </Button>
        </Link>
      </Box>

      <Box
        sx={{
          padding: "2rem",
          backgroundColor: "#212529",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="body1" sx={{ fontSize: "1rem" }}>
          © {new Date().getFullYear()} Online Quizz Portal. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}

export default ProfessionalLandingPage;
