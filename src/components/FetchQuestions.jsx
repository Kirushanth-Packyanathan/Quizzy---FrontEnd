import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionsForUser } from "../service/QuizzService";
import {
  Box,
  Typography,
  Paper,
  Container,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import NavigationBar from "../components/NavigationBar";
import { Global } from "@emotion/react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Quiz = () => {
  const { subject, numQuestions } = useParams();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/takeQuizz");
  };
  const ReTakeQuizz = () => {
    setOpen(false);
    navigate(`/quiz/${subject}/${numQuestions}`);
    setUserAnswers({});
  };
  const GoBackHome = () => {
    setOpen(false);
    navigate("/");
  };

  useEffect(() => {
    fetchQuestions();
  }, [subject, numQuestions]);

  async function fetchQuestions() {
    try {
      const response = await getQuestionsForUser(numQuestions, subject);
      setQuestions(response.data);
      setUserAnswers({}); // Reset user answers when new questions are fetched
    } catch (error) {
      console.log("Error fetching questions: ", error);
    }
  }

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmit = () => {
    handleClickOpen();
    let score = 0;
    questions.forEach((question) => {
      const correctAnswers = new Set(
        question.correctAnswers.map((answer) => answer.trim().toLowerCase())
      );
      const userAnswer = (userAnswers[question.id] || "").trim().toLowerCase();
      if (correctAnswers.has(userAnswer)) {
        score += 1;
      }
    });
    setScore(score);
  };

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
              marginTop: "50px",
              marginBottom: "50px",
              minWidth: "600px",
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
              {subject} Quiz
            </Typography>

            {questions.map((question) => (
              <Box key={question.id} mt={2}>
                <Typography variant="h6">{question.question}</Typography>
                {question.questionType === "multiple-choice" ? (
                  <FormControl component="fieldset" fullWidth>
                    <RadioGroup
                      value={userAnswers[question.id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                    >
                      {question.choices.map((choice, index) => (
                        <FormControlLabel
                          key={index}
                          value={choice}
                          control={<Radio />}
                          label={choice}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                ) : question.questionType === "short-answer" ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    variant="outlined"
                    value={userAnswers[question.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                  />
                ) : null}{" "}
                {/* Add other question types as needed */}
              </Box>
            ))}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              style={{
                marginTop: "1.5rem",
                padding: "0.75rem",
                fontWeight: "bold",
                backgroundColor: "#1976d2",
              }}
            >
              Submit
            </Button>

            {/* {score !== null && (
              <Typography
                variant="h6"
                align="center"
                style={{ marginTop: "1rem", color: "#333" }}
              >
                Your Score: {score} / {questions.length}
              </Typography>
            )} */}
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "primary.main",
                  minWidth: "350px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                }}
              >
                {"Your Score"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-slide-description"
                  style={{ textAlign: "center", fontSize: "1.5rem" }}
                >
                  {score === questions.length ? (
                    <>
                      <EmojiEventsIcon
                        style={{ fontSize: "5rem", color: "#FFD700" }}
                      />
                      <br />
                      <Typography
                        variant="h5"
                        component="span"
                        style={{ color: "#4CAF50", fontWeight: "bold" }}
                      >
                        {" "}
                        {score} / {questions.length}
                        <br />
                        Perfect! 🎉
                      </Typography>
                    </>
                  ) : (
                    <>
                      {score >= questions.length / 2 ? (
                        <>
                          <EmojiEventsIcon
                            style={{ fontSize: "5rem", color: "#4CAF50" }}
                          />
                          <br />
                          <Typography
                            variant="h5"
                            component="span"
                            style={{ color: "#4CAF50", fontWeight: "bold" }}
                          >
                            {" "}
                            {score} / {questions.length}
                            <br />
                            Well done!
                            👍
                          </Typography>
                        </>
                      ) : (
                        <>
                          <SentimentDissatisfiedIcon
                            style={{ fontSize: "5rem", color: "#FF5722" }}
                          />
                          <br />
                          <Typography
                            variant="h5"
                            component="span"
                            style={{ color: "#FF5722", fontWeight: "bold" }}
                          >
                            {" "}
                            {score} / {questions.length}
                            <br />
                            Don't give up! 
                             😅
                          </Typography>
                        </>
                      )}
                    </>
                  )}
                </DialogContentText>
              </DialogContent>
              <DialogActions
                sx={{
                  padding: "16px",
                  flexDirection: "column",
                  gap: "8px",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <Button
                  onClick={ReTakeQuizz}
                  sx={{
                    color: "#2196F3",
                    fontSize: "1rem",
                    padding: "4px 40px",
                    border: "2px solid #2196F3",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                      borderColor: "#1976d2",
                    },
                  }}
                >
                  Retake Quizz
                </Button>
                <Button
                  onClick={GoBackHome}
                  sx={{
                    color: "#F44336",
                    fontSize: "1rem",
                    padding: "4px 40px",
                    border: "2px solid #F44336",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#ffebee",
                      borderColor: "#d32f2f",
                    },
                  }}
                >
                  Back To Home
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Quiz;
