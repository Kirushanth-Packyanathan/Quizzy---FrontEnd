import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { getAllQuestions } from "../service/QuizzService"; // Make sure to adjust the import path
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const countQuestionsBySubject = (questions) => {
  const subjectCounts = questions.reduce((acc, question) => {
    const { subject } = question;
    if (!acc[subject]) {
      acc[subject] = 0;
    }
    acc[subject]++;
    return acc;
  }, {});

  return Object.entries(subjectCounts).map(([subject, count]) => ({
    id: subject,
    value: count,
    label: subject,
  }));
};

const countQuestionsByType = (questions) => {
  const typeCounts = questions.reduce((acc, question) => {
    const { questionType } = question;
    if (!acc[questionType]) {
      acc[questionType] = 0;
    }
    acc[questionType]++;
    return acc;
  }, {});

  return Object.entries(typeCounts).map(([type, count]) => ({
    id: type,
    value: count,
    label: type,
  }));
};

const QuestionStats = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllQuestions()
      .then((response) => {
        const questions = response.data;
        const subjectChartData = countQuestionsBySubject(questions);
        const typeChartData = countQuestionsByType(questions);
        setSubjectData(subjectChartData);
        setTypeData(typeChartData);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Typography
        variant="h5"
        alignItems="center"
        sx={{
          fontWeight: "bold",
          color: "black",
          mb: "5px",
          mt: "1px",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        Question Statistics by Subject
      </Typography>
      <PieChart
        series={[
          {
            data: subjectData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: {
              innerRadius: 10,
              additionalRadius: -30,
              color: "gray",
            },
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: 0,
            endAngle: 360,
            cx: 130,
            cy: 100,
          },
        ]}
        width={400}
        height={250}
      />
      <Typography
        variant="h5"
        alignItems="center"
        sx={{
          fontWeight: "bold",
          color: "black",
          mb: "5px",
          mt: "20px",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        Question Statistics by Type
      </Typography>
      <PieChart
        series={[
          {
            data: typeData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: {
              innerRadius: 10,
              additionalRadius: -30,
              color: "gray",
            },
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: 0,
            endAngle: 360,
            cx: 130,
            cy: 100,
          },
        ]}
        width={400}
        height={250}
      />
    </div>
  );
};

export default QuestionStats;
