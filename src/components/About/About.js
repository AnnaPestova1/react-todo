import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import style from "./About.module.css";

function About() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/home") {
      document.body.style.backgroundImage =
        "url('./pexels-cottonbro-studio-5191390.jpg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }
  }, [location.pathname]);
  return (
    <div className={style.AboutPage}>
      <p>
        The ultimate productivity companion for managing your tasks and
        organizing your reading list.
      </p>
      <p>
        This empowering you to accomplish more and indulge in your love for
        books.
      </p>
    </div>
  );
}

export default About;
