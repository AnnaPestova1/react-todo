import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "../components/TodoContainer/TodoContainer";
import "./App.module.css";

const tableName = process.env.REACT_APP_TABLE_NAME;
const baseName = process.env.REACT_APP_AIRTABLE_BASE_ID;
const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <TodoContainer
              tableName={tableName}
              baseName={baseName}
              apiKey={apiKey}
            />
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
