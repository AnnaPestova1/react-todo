import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TodoContainer from "../TodoContainer/TodoContainer";
import style from "./App.module.css";
import NavBar from "../NavBar/NavBar";

const tableName = process.env.REACT_APP_TABLE_NAME;
const baseName = process.env.REACT_APP_AIRTABLE_BASE_ID;
const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;

function App() {
  const [theme, setTheme] = React.useState("light");

  const handleToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <div className={style[theme]}>
      <BrowserRouter>
        <NavBar theme={theme} handleToggle={handleToggle} />
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
    </div>
  );
}

export default App;
