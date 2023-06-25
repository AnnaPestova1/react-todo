import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { ReactComponent as DarkMode } from "../../img/dark_mode_black_24dp.svg";
import { ReactComponent as LightMode } from "../../img/light_mode_black_24dp-2.svg";
import style from "./LightDarkMode.module.css";

//buttons for dark/light mode
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

LightDarkMode.propTypes = {
  theme: PropTypes.string,
  handleToggle: PropTypes.func,
};
export default LightDarkMode;
