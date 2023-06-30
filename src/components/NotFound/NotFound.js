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
  }, [location.pathname]);

  return (
    <div className={style.NotFound}>
      <div className={style.Error}>Page not found</div>
    </div>
  );
}

export default NotFound;
