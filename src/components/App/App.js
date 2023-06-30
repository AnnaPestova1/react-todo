import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TodoContainer from "../Todo/TodoContainer/TodoContainer";
import ToReadContainer from "../ToRead/ToReadContainer/ToReadContainer";
import NavBar from "../NavBar/NavBar";
import NotFound from "../NotFound/NotFound";
import About from "../About/About";
import Footer from "../Footer/Footer";
import style from "./App.module.css";

//consts for API in TodoContainer and in ToReadContainer
const tableName = process.env.REACT_APP_TABLE_NAME;
const tableBooksName = process.env.REACT_APP_TABLE_NAME_BOOKS;
const baseName = process.env.REACT_APP_AIRTABLE_BASE_ID;
const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  //change dark/light mode
  const handleToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={style[theme]}>
      <BrowserRouter>
        <NavBar theme={theme} handleToggle={handleToggle} />
        <Routes>
          <Route path="/home" element={<About />} />
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
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
