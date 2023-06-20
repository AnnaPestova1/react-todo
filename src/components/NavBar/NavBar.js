import React, { useEffect, useState } from "react";
import LightDarkMode from "../LightDarkMode/LightDarkMode";
import { Link } from "react-router-dom";
import { ReactComponent as Menu } from "../../img/menu_FILL0_wght400_GRAD0_opsz48.svg";
import style from "./NavBar.module.css";

function NavBar({ theme, handleToggle }) {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleResizeWindow = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <div className={style.NavBar}>
      {screenSize < 767 ? (
        <div
          className={style.MobileMenu}
          onClick={() => setShowMenu((showMenu) => !showMenu)}
        >
          {showMenu ? (
            <ul className={style.MobileMenuLinks}>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/todo">Todo</Link>
              </li>
              <li>
                <Link to="/toread">To Read</Link>
              </li>
            </ul>
          ) : (
            <div>
              <Menu />
            </div>
          )}
        </div>
      ) : (
        <>
          <Link to="/about">About</Link>
          <Link to="/todo">Todo</Link>
          <Link to="/toread">To Read</Link>
        </>
      )}
      <LightDarkMode theme={theme} handleToggle={handleToggle} />
    </div>
  );
}

export default NavBar;
