import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import axios from "axios";
import { saveStudentData } from "../service/QuizzService";

const LogInPage = () => {
  const [user, setUser] = useState(null);
  const [loginType, setLoginType] = useState("student");
  const [userSaveDB, setUserSaveDB] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSaveUserData = async () => {
      try {
        console.log("Sending request to get user info...");
        const response = await axios.get(
          "http://localhost:8080/api/user/user-info",
          { withCredentials: true }
        );
        console.log("Received response:", response);
        setUser(response.data);

        // Set the data to save to DB
        if (response.data.name) {
          const userData = {
            name: response.data.name,
            email: response.data.email,
          };
          setUserSaveDB(userData);
        }
      } catch (error) {
        console.error("Error occurred during API call:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSaveUserData();
  }, []);

  const googleLogIn = async () => {
    try {
      window.location.href =
        "http://localhost:8080/oauth2/authorization/google";
      loggedIn();
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const gitHubLogIn = async () => {
    try {
      window.location.href =
        "http://localhost:8080/oauth2/authorization/github";
      loggedIn();
    } catch (error) {
      console.error("GitHub login error:", error);
    }
  };

  const loggedIn = async () => {
    if (user) {
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("family_name", user.family_name);
      console.log("User data stored in localStorage:", user);

      // Determine role and save to localStorage
      const role = loginType === "student" ? "student" : "admin";
      localStorage.setItem("userRole", role);
      console.log("role", role);

      if (role === "student") {
        try {
          await saveStudentDataDB(userSaveDB);
        } catch (error) {
          console.error("Error saving student data:", error);
        }
      } else {
        try {
          await saveStudentDataDB(userSaveDB);
        } catch (error) {
          console.error("Error saving student data:", error);
        }
      }
    }
  };

  const handleLoginTypeChange = (event, newLoginType) => {
    if (newLoginType !== null) {
      setLoginType(newLoginType);
    }
  };

  const saveStudentDataDB = async (userData) => {
    try {
      const response = await saveStudentData(userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 8,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <ToggleButtonGroup
        value={loginType}
        exclusive
        onChange={handleLoginTypeChange}
        sx={{ mb: 4 }}
      >
        <ToggleButton value="student" sx={{ flex: 1 }}>
          Student
        </ToggleButton>
        <ToggleButton value="admin" sx={{ flex: 1 }}>
          Admin
        </ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome Back, {loginType === "student" ? "Student" : "Admin"}!
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Please log in using one of the following services:
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={googleLogIn}
          fullWidth
          sx={{ mb: 2, py: 1.5 }}
        >
          Log In with Google
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={gitHubLogIn}
          fullWidth
          sx={{ py: 1.5 }}
        >
          Log In with GitHub
        </Button>
      </Box>
    </Container>
  );
};

export default LogInPage;
