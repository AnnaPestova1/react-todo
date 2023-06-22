import React from "react";
import { ReactComponent as DarkMode } from "../../img/dark_mode_black_24dp.svg";
import { ReactComponent as LightMode } from "../../img/light_mode_black_24dp-2.svg";
import style from "./LightDarkMode.module.css";
import Button from "../Button";

function LightDarkMode({ theme, handleToggle }) {
  return (
    <div className={style.LightDarkButton}>
      {theme === "light" ? (
        <Button type="button" title="dark mode" onClick={() => handleToggle()}>
          <DarkMode />
        </Button>
      ) : (
        <Button type="button" title="light mode" onClick={() => handleToggle()}>
          <LightMode />
        </Button>
      )}
    </div>
  );
}

export default LightDarkMode;
