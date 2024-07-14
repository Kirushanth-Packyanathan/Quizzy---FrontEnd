import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Divider,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  getAllQuestions,
  getAllSubjects,
  getAllSubjectsByTypes,
  deleteQuestion,
} from "../service/QuizzService";
import QuestionStats from "./QuestionStats";
import AddQuestion from "./AddQuestion";
import NavigationBar from "./NavigationBar";

const commonBoxStyles = {
  minHeight: "120vh",
  backgroundColor: "#EEEEEE",
  padding: "32px",
  borderRadius: 5,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  flex: 1,
  margin: "16px",
};

const smallBoxStyles = {
  minHeight: "20vh",
  backgroundColor: "#F6F9FD",
  padding: "20px",
  borderRadius: 5,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  flex: 1,
  margin: "16px",
};

export default function GetAllQuestions() {
  const [questions, setQuestions] = useState([]);
  const [subject, setSubject] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSubject(event.target.value);
  };

  async function fetchAllQuestions() {
    try {
      const response = await getAllQuestions();
      setQuestions(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching all questions ", error);
    }
  }

  async function fetchAllSubjects() {
    try {
      const response = await getAllSubjects();
      setSubjectOptions(response.data);
    } catch (error) {
      console.log("Error fetching subject options ", error);
    }
  }

  async function searchBySubject(subject) {
    try {
      const response = await getAllSubjectsByTypes(subject);
      console.log(response.data);
      setQuestions(response.data);
    } catch (error) {
      console.log("Error fetching subject options ", error);
    }
  }

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  useEffect(() => {
    fetchAllSubjects();
  }, []);

  async function handleDeleteQuestion(id) {
    try {
      console.log("Deleting question with id:", id);
      const response = await deleteQuestion(id);
      console.log("Question deleted:", response.data);
      // Optionally refresh questions list after deletion
      fetchAllQuestions();
    } catch (error) {
      console.log("Error deleting ", error);
    }
  }

  const handleEditClick = (question) => {
    navigate("/update-account", { state: { question } });
  };

  return (
    <div>
      <NavigationBar/>
      <Grid container spacing={0}>
        <Grid item xs={12} md={8}>
          <Box sx={commonBoxStyles}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "black",
                mb: "1px",
                mt: "1px",
                fontFamily: "Montserrat, sans-serif",
                textAlign: "center",
              }}
            >
              All Questions
            </Typography>
            <Divider />
            <Typography>Add filters</Typography>
            <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
              <InputLabel id="demo-select-small-label">Subject</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={subject}
                label="Subject"
                onChange={handleChange}
              >
                {subjectOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => searchBySubject(subject)}
              sx={{ mt: 1, ml: 2 }}
            >
              Search
            </Button>
            <Box sx={{ display: "inline", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/add-question");
                }}
                sx={{ mt: 1, ml: 50 }}
              >
                + Add Question
              </Button>
            </Box>
            <div style={{ overflow: "auto", maxHeight: "100vh" }}>
              {questions.map((question, index) => (
                <Box key={index} sx={smallBoxStyles}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {question.question}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "gray", mb: 1 }}>
                    <b>Type:</b> {question.questionType}
                  </Typography>
                  {question.questionType === "multiple-choice" ? (
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <b>Choices:</b> {question.choices.join(", ")}
                    </Typography>
                  ) : null}
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <b>Correct Answers: </b>
                    {question.correctAnswers.join(", ")}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      sx={{ mr: 1 }} // Maintains margin between buttons
                      onClick={() => handleEditClick(question)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              ))}
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              minHeight: "120vh",
              backgroundColor: "#EEEEEE",
              padding: "32px",
              borderRadius: 10,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              flex: 1,
              margin: "16px",
            }}
          >
            <QuestionStats />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
