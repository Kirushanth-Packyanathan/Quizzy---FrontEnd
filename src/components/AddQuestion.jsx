import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  MenuItem,
  TextField,
  Divider,
  Button,
} from "@mui/material";
import { getAllSubjects, createQuestion } from "../service/QuizzService";
import NavigationBar from "./NavigationBar";
import { display, maxWidth } from "@mui/system";

const commonBoxStyles = {
  minHeight: "100vh",
  maxWidth:"120vh",
  padding: "32px",
  // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  flex: 1,
  margin: "16px",
};

const contentTypographyStyles = {
  color: "#333",
  fontSize: "1.2rem",
  fontWeight: 500,
};

export default function SimpleContainer() {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [choices, setChoices] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [newSubjectValue, setNewSubjectValue] = useState("");
  const [isNewSubjectOpen, setIsNewSubjectOpen] = useState(false);
  const [choiceCounter, setChoiceCounter] = useState(0); // Counter to track choice letters

  const [errors, setErrors] = useState({}); // State to track validation errors

  const handleAddNewClick = () => {
    setIsNewSubjectOpen(true);
  };

  const handleNewSubjectChange = (event) => {
    setNewSubjectValue(event.target.value);
  };

  async function fetchAllSubjects() {
    try {
      const response = await getAllSubjects();
      setSubjectOptions(response.data);
    } catch (error) {
      console.log("Error fetching subject options ", error);
    }
  }

  const handleAddChoice = () => {
    const newChoiceLetter = String.fromCharCode(65 + choiceCounter); // 65 is the char code for 'A'
    const newChoice = { id: newChoiceLetter, text: "" };
    setChoices([...choices, newChoice]);
    setChoiceCounter(choiceCounter + 1);
  };

  const handleRemoveChoice = (index) => {
    setChoices(choices.filter((choice, i) => i !== index));
    setChoiceCounter(choiceCounter - 1); // Decrease counter when a choice is removed
  };

  const handleChoiceChange = (index, value) => {
    setChoices(
      choices.map((choice, i) =>
        i === index ? { ...choice, text: value } : choice
      )
    );
  };

  const handleSubmit = async () => {
    let validationErrors = {};

    if (!question) {
      validationErrors.question = "Question is required";
    }

    if (!questionType) {
      validationErrors.questionType = "Question type is required";
    }

    if (questionType === "MCQ" && choices.length === 0) {
      validationErrors.choices = "At least one choice is required";
    }

    if (!correctAnswer) {
      validationErrors.correctAnswer = "Correct answer is required";
    }

    if (isNewSubjectOpen && !newSubjectValue) {
      validationErrors.newSubjectValue = "New subject is required";
    }

    if (!isNewSubjectOpen && !subject) {
      validationErrors.subject = "Subject is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const formattedChoices = choices.map((choice) => choice.text);
    const newQuestion = {
      question,
      subject: isNewSubjectOpen ? newSubjectValue : subject,
      questionType: questionType === "MCQ" ? "multiple-choice" : "short-answer",
      choices: formattedChoices,
      correctAnswers: [correctAnswer],
    };

    try {
      await createQuestion(newQuestion);
      // Optionally, reset form fields after successful submission
      setQuestion("");
      setQuestionType("");
      setChoices([]);
      setCorrectAnswer("");
      setSubject("");
      setNewSubjectValue("");
      setIsNewSubjectOpen(false);
      setChoiceCounter(0);
      setErrors({});
      console.log("Question saved successfully");
    } catch (error) {
      console.log("Error saving question ", error);
    }
  };

  useEffect(() => {
    fetchAllSubjects();
  }, [subject]);

  return (
    <>
      <NavigationBar />
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' ,marginTop:'10vh'}}>
      <Box sx={commonBoxStyles}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "black",
            mb: "16px",
            mt: "16px",
            fontFamily: "Montserrat, sans-serif",
            textAlign: "center",
          }}
        >
          Add Question
        </Typography>
        <Divider sx={{ mb: "24px" }} />

        <Box
          marginBottom={2}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <TextField
            id="filled-select-subject"
            select
            label="Select Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Placeholder"
            sx={{ width: "30%" }}
            error={!!errors.subject}
            helperText={errors.subject}
          >
            {subjectOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
            <MenuItem value="Add new" onClick={handleAddNewClick}>
              Add New
            </MenuItem>
          </TextField>
            <br/>
          {isNewSubjectOpen && (
            <TextField
              id="new-subject"
              label="Enter New Subject"
              placeholder="New Subject"
              value={newSubjectValue}
              onChange={handleNewSubjectChange}
              sx={{ width: "30%" }}
              error={!!errors.newSubjectValue}
              helperText={errors.newSubjectValue}
            />
          )}
          <TextField
            id="filled-select-question-type"
            select
            label="Select Question Type"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            placeholder="Placeholder"
            sx={{ width: "30%" }}
            error={!!errors.questionType}
            helperText={errors.questionType}
          >
            <MenuItem value="MCQ">MCQ</MenuItem>
            <MenuItem value="ShortAnswer">Short Answer</MenuItem>
          </TextField>
        </Box>

        {questionType === "MCQ" && (
          <Box>
            <Box marginBottom={2}>
              <TextField
                id="outlined-textarea"
                label="Question"
                placeholder="Question"
                multiline
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                sx={{ width: "100%" }}
                error={!!errors.question}
                helperText={errors.question}
              />
            </Box>
            {choices.map((choice, index) => (
              <Box key={index} marginBottom={1}>
                <TextField
                  id={`choice-${index}`}
                  label={`Choice ${choice.id}`}
                  placeholder={`Choice ${choice.id}`}
                  value={choice.text}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  sx={{ width: "80%" }}
                  error={!!errors.choices}
                  helperText={errors.choices}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveChoice(index)}
                  sx={{ mt: 1, ml: 2 }}
                >
                  Remove
                </Button>
              </Box>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddChoice}
              sx={{ mt: 1 }}
            >
              Add Choice
            </Button>
            <Box marginBottom={2} marginTop={2}>
              <TextField
                id="outlined-textarea"
                label="Correct Answer"
                placeholder="Correct Answer"
                multiline
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                sx={{ width: "100%" }}
                error={!!errors.correctAnswer}
                helperText={errors.correctAnswer}
              />
            </Box>
          </Box>
        )}

        {questionType === "ShortAnswer" && (
          <Box>
            <Box marginBottom={2}>
              <TextField
                id="outlined-textarea"
                label="Question"
                placeholder="Question"
                multiline
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                sx={{ width: "100%" }}
                error={!!errors.question}
                helperText={errors.question}
              />
            </Box>
            <Box marginBottom={2}>
              <TextField
                id="outlined-textarea"
                label="Correct Answer"
                placeholder="Correct Answer"
                multiline
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                sx={{ width: "100%" }}
                error={!!errors.correctAnswer}
                helperText={errors.correctAnswer}
              />
            </Box>
          </Box>
        )}
        <Box textAlign="center">
          {question && correctAnswer?
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              fontWeight: "bold",
              padding: "10px 24px",
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: 8,
              backgroundColor: "#17153B",
            }}
          >
            Submit
          </Button>:null}
        </Box>
      </Box>
      </Container>
      </>
  );
}
