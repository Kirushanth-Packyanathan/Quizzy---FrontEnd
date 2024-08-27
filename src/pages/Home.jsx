// import React from "react";
// import { Box, Paper, Typography, Container, Button } from "@mui/material";
// import NavigationBar from "../components/NavigationBar";

// function ProfessionalLandingPage() {
//   return (
//     <>
//       <NavigationBar />
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         minHeight="80vh"
//         padding="4rem"
//         sx={{
//           color: "#212529",
//           background: "linear-gradient(to bottom, #FFFBF5, #36C2CE)", // gradient background
//         }}
//       >
//         <Typography
//           variant="h2"
//           sx={{ marginBottom: "1rem", fontWeight: "bold", textAlign: "center" }}
//         >
//           Welcome to <br />
//           Online Quizz Portal
//         </Typography>
//         <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
//           Find the Perfect Quiz for You
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: "#4535C1" }}
//         >
//           Take a Quiz Now!
//         </Button>
//       </Box>
//     </>
//   );
// }

// export default ProfessionalLandingPage;

import React from "react";
import {
  Box,
  Paper,
  Typography,
  Container,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import NavigationBar from "../components/NavigationBar";
import { Link } from 'react-router-dom';

function ProfessionalLandingPage() {
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

      {/* <Container sx={{ padding: "4rem 0" }}>
        <Typography
          variant="h3"
          sx={{ marginBottom: "2rem", fontWeight: "bold", textAlign: "center" }}
        >
          About Us
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "2rem", fontSize: "1.2rem" }}>
          The Online Quizz Portal is a state-of-the-art platform offering a wide variety of quizzes to help you test your knowledge and learn new things. Our mission is to provide an engaging and educational experience for users of all ages.
        </Typography>
      </Container> */}

      {/* <Container sx={{ padding: "4rem 0", backgroundColor: "#f9f9f9" }}>
        <Typography
          variant="h3"
          sx={{ marginBottom: "2rem", fontWeight: "bold", textAlign: "center" }}
        >
          Contact Us
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Name"
              variant="outlined"
              sx={{ marginBottom: "1rem" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your Email"
              variant="outlined"
              sx={{ marginBottom: "1rem" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Your Message"
              variant="outlined"
              multiline
              rows={4}
              sx={{ marginBottom: "1rem" }}
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button variant="contained" sx={{ backgroundColor: "#4535C1", padding: "0.5rem 2rem", fontSize: "1.2rem" }}>
              Send Message
            </Button>
          </Grid>
        </Grid>
      </Container> */}

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
