import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GetAllQuestions from './components/GetAllQuestions'; // Adjust the import based on your file structure
import UpdateAccount from './components/UpdateQuestion'; // Ensure this component exists
import AddQuestion from "./components/AddQuestion"
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/update-account" element={<UpdateAccount />} />
      <Route path="/add-question" element={<AddQuestion />} />
      <Route path="/view-questions" element={<GetAllQuestions />} />
    </Routes>
  );
}

export default App;
