import React from "react";
import style from "./NotFound.module.css";

function NotFound() {
  //changing background for 404 page
  React.useEffect(() => {
    if (window.location.pathname === "/404") {
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
