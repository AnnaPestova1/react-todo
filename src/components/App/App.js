import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TodoContainer from "../../components/Todo/TodoContainer/TodoContainer";
import ToReadContainer from "../ToRead/ToReadContainer/ToReadContainer";
import style from "./App.module.css";
import NavBar from "../NavBar/NavBar";
import NotFound from "../NotFound/NotFound";

const tableName = process.env.REACT_APP_TABLE_NAME;
const tableBooksName = process.env.REACT_APP_TABLE_NAME_BOOKS;
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
          <Route path="/about" element={<h1>About</h1>} />
          <Route
            path="/todo"
            element={
              <TodoContainer
                tableName={tableName}
                baseName={baseName}
                apiKey={apiKey}
              />
            }
          />
          <Route
            path="/toread"
            element={
              <ToReadContainer
                tableBooksName={tableBooksName}
                baseName={baseName}
                apiKey={apiKey}
              />
            }
          />
          <Route path="/*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
