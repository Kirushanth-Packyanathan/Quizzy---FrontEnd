import React, { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { getAllSubjects } from "../service/QuizzService";

const StartQuizz = () => {
  const [subject, setSubject] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([]);

  const navigate = useNavigate();

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleNumQuestionsChange = (event) => {
    setNumQuestions(event.target.value);
  };

  const handleStartQuiz = () => {
    // Navigate to the quiz component and pass the subject and numQuestions as URL parameters
    navigate(`/quiz/${subject}/${numQuestions}`);
  };

  useEffect(() => {
    fetchAllSubjects();
  }, []);

  async function fetchAllSubjects() {
    try {
      const response = await getAllSubjects();
      setSubjectOptions(response.data);
    } catch (error) {
      console.log("Error fetching subject options ", error);
    }
  }

  return (
    <Box
      sx={{
        color: "#212529",
        background: "linear-gradient(to bottom, #FFFBF5, #36C2CE)",
        minHeight: "100vh",
      }}
    >
      <NavigationBar />
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="calc(90vh - 64px)"
          mt={-4}
        >
          <Paper
            elevation={6}
            style={{
              padding: "2rem",
              borderRadius: "15px",
              backgroundColor: "#f7f7f7",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ fontWeight: "bold", color: "#333" }}
            >
              Start Your Quiz
            </Typography>

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Subject</InputLabel>
              <Select
                value={subject}
                onChange={handleSubjectChange}
                label="Subject"
                style={{ backgroundColor: "#fff", borderRadius: "5px" }}
              >
                {subjectOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Number of Questions"
              type="number"
              value={numQuestions}
              onChange={handleNumQuestionsChange}
              variant="outlined"
              style={{
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleStartQuiz}
              style={{
                marginTop: "1.5rem",
                padding: "0.75rem",
                fontWeight: "bold",
                backgroundColor: "#1976d2",
              }}
            >
              Start Quiz
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default StartQuizz;
