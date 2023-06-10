import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TodoContainer from "../components/TodoContainer/TodoContainer";
import "./App.module.css";
import NavBar from "../components/NavBar/NavBar";

const tableName = process.env.REACT_APP_TABLE_NAME;
const baseName = process.env.REACT_APP_AIRTABLE_BASE_ID;
const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/home"
          element={
            <TodoContainer
              tableName={tableName}
              baseName={baseName}
              apiKey={apiKey}
            />
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
        <Route path="/*" element={<Navigate replace to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
