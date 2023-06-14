import React from "react";
import { ReactComponent as DarkMode } from "../../img/dark_mode_FILL0_wght400_GRAD0_opsz48.svg";
import { ReactComponent as LightMode } from "../../img/light_mode_FILL0_wght400_GRAD0_opsz48.svg";
import style from "./LightDarkMode.module.css";

function LightDarkMode({ theme, handleToggle }) {
  return (
    <div className={style.LightDarkButton}>
      {theme === "light" ? (
        <button type="button" title="dark mode" onClick={() => handleToggle()}>
          <DarkMode />
        </button>
      ) : (
        <button type="button" title="light mode" onClick={() => handleToggle()}>
          <LightMode />
        </button>
      )}
    </div>
  );
}

export default LightDarkMode;
