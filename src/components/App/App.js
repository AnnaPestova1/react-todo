import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import TodoContainer from "../../components/Todo/TodoContainer/TodoContainer";
import ToReadContainer from "../ToRead/ToReadContainer/ToReadContainer";
// import About from "../About/About";
import style from "./App.module.css";
import NavBar from "../NavBar/NavBar";
import NotFound from "../NotFound/NotFound";
import About from "../About/About";

const tableName = process.env.REACT_APP_TABLE_NAME;
const tableBooksName = process.env.REACT_APP_TABLE_NAME_BOOKS;
const baseName = process.env.REACT_APP_AIRTABLE_BASE_ID;
const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;

// const useReactPath = () => {
//   const [path, setPath] = React.useState(window.location.pathname);
//   const listenToPopstate = () => {
//     const winPath = window.location.pathname;
//     setPath(winPath);
//     console.log(winPath);
//   };
//   React.useEffect(() => {
//     window.addEventListener("popstate", listenToPopstate);
//     return () => {
//       window.removeEventListener("popstate", listenToPopstate);
//     };
//   }, []);
//   return path;
// };

function App() {
  const [theme, setTheme] = React.useState("light");
  // const location = useReactPath();
  // console.log(location);
  // const [location, setLocation] = useState(window.location.pathname);
  // console.log(window.location.href);
  // const url = window.location.href;

  // useEffect(() => {
  //   console.log(location);
  // }, [location]);

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
          <Route path="/about" element={<About />} />
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
          <Route path="/" element={<Navigate to="/about" />} />
          <Route path="/*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
