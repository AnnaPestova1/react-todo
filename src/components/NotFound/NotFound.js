import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import style from "./NotFound.module.css";

function NotFound() {
  //changing background for 404 page
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/404") {
      document.body.style.backgroundImage =
        "url('./pexels-gül-işık-4066276.jpg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }
  }, []);

  return (
    <div className={style.NotFound}>
      <h1 className={style.Error}>Error 404: Page not found</h1>
    </div>
  );
}

export default NotFound;
