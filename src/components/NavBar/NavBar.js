import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import LightDarkMode from "../LightDarkMode/LightDarkMode";
import Button from "../Button/Button";
import { ReactComponent as Logo } from "../../img/CustomLogo.svg";
import { ReactComponent as Menu } from "../../img/menu_black_24dp.svg";
import { ReactComponent as Close } from "../../img/close_black_24dp.svg";
import style from "./NavBar.module.css";

function NavBar({ theme, handleToggle }) {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);

  // changing NavBar view according full/mobile size
  useEffect(() => {
    const handleResizeWindow = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  const navigate = useNavigate();
  const navigateToTodo = () => {
    navigate("/todo");
  };
  return (
    <header>
      <div className={style.NavBar}>
        <div onClick={navigateToTodo} className={style.Logo}>
          <Logo />
        </div>
        {screenSize < 767 ? (
          <>
            {!showMenu ? (
              <Button
                type="submit"
                title="open menu"
                className={style.MobileMenu}
                onClick={() => setShowMenu((showMenu) => !showMenu)}
              >
                <Menu />
              </Button>
            ) : (
              <ul className={style.MobileMenuLinks}>
                <li>
                  <Link to="/todo">Todo</Link>
                </li>
                <li>
                  <Link to="/toread">To Read</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <div onClick={() => setShowMenu(false)}>
                    <Close />
                  </div>
                </li>
              </ul>
            )}
          </>
        ) : (
          <div className="style.FullSizeNavBar">
            <Link to="/todo">Todo</Link>
            <Link to="/toread">To Read</Link>
            <Link to="/about">About</Link>
          </div>
        )}
        <LightDarkMode theme={theme} handleToggle={handleToggle} />
      </div>
    </header>
  );
}

NavBar.propTypes = {
  theme: PropTypes.string,
  handleToggle: PropTypes.func,
};
export default NavBar;
