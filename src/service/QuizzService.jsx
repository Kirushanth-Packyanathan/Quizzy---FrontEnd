import axios from "axios";
import { URL } from "./BaseUrl";

const REST_API_BASE_URL = `${URL}`;

export const createQuestion = (question) => {
  return axios.post(
    `${REST_API_BASE_URL}/api/quizzes/createQuestion`,
    question
  );
};

export const getAllQuestions = () => {
  return axios.get(`${REST_API_BASE_URL}/api/quizzes/getAllQuestions`);
};

export const getAllSubjectsByTypes = (subject) => {
  return axios.get(`${REST_API_BASE_URL}/api/quizzes/subjectsByTypes/${subject}`);
};

export const getQuestionsForUser = (numOfQuestions, subject) => {
  return axios.get(
    `${REST_API_BASE_URL}/api/quizzes/quiz/getQuestionsForUser?numOfQuestions=${numOfQuestions}&subject=${subject}`
  );
};

export const getAllSubjects = () => {
  return axios.get(`${REST_API_BASE_URL}/api/quizzes/subjects`);
};

export const updateQuestion = (id,updatedQuestion) => {
    return axios.put(`${REST_API_BASE_URL}/api/quizzes/question/${id}/update`,updatedQuestion);
};

export const deleteQuestion = (id) => {
    return axios.delete(`${REST_API_BASE_URL}/api/quizzes/question/${id}/delete`);
};

export const getQuestionById = (id) => {
    return axios.get(`${REST_API_BASE_URL}/api/quizzes/getQuestionById/${id}`);
};
