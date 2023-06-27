import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import style from "./About.module.css";

function About() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/about") {
      document.body.style.backgroundImage =
        "url('./pexels-cottonbro-studio-5191390.jpg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }
  }, []);
  return (
    <div className={style.AboutPage}>
      The ultimate productivity companion for managing your tasks and organizing
      your reading list.
    </div>
  );
}

export default About;
