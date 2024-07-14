import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { updateQuestion } from "../service/QuizzService"; // Import the updateQuestion function
import NavigationBar from "./NavigationBar";

const UpdateQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Access the state passed from the previous component
  const questionData = location.state?.question || {};

  const [id] = useState(questionData.id || "");
  const [question, setQuestion] = useState(questionData.question || "");
  const [subject, setSubject] = useState(questionData.subject || "");
  const [questionType, setQuestionType] = useState(questionData.questionType || "");
  const [choices, setChoices] = useState(questionData.choices?.join(", ") || "");
  const [correctAnswers, setCorrectAnswers] = useState(questionData.correctAnswers?.join(", ") || "");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedQuestion = {
      question,
      subject,
      questionType,
      choices: choices.split(",").map(choice => choice.trim()),
      correctAnswers: correctAnswers.split(",").map(answer => answer.trim())
    };

    try {
      await updateQuestion(id, updatedQuestion);
      navigate("/view-questions");
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <div>
      <NavigationBar/>
      <Card sx={{ width: "600px", margin: "auto", marginTop: "10px", padding: "20px" }}>
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              textAlign: "center",
              mb: 3,
            }}
          >
            Update Question
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="question"
                  label="Question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="subject"
                  label="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="questionType"
                  label="Question Type"
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="choices"
                  label="Choices"
                  value={choices}
                  onChange={(e) => setChoices(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  required
                  id="correctAnswers"
                  label="Correct Answers"
                  value={correctAnswers}
                  onChange={(e) => setCorrectAnswers(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item sx={{ textAlign: "center" }}>
                <Button type="submit" variant="contained" color="primary" sx={{ mr: 3 }}>
                  Submit
                </Button>
                <Button variant="outlined" onClick={() => navigate("/view-questions")}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateQuestion;
