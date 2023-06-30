import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LightDarkMode from "../LightDarkMode/LightDarkMode";
import Button from "../Button/Button";
import { ReactComponent as Logo } from "../../img/CustomLogo.svg";
import { ReactComponent as LogoDarkMode } from "../../img/CustomLogoDarkMode.svg";
import { ReactComponent as Menu } from "../../img/menu_black_24dp.svg";
import { ReactComponent as Close } from "../../img/close_black_24dp.svg";
import style from "./NavBar.module.css";

interface NavBarProps {
  theme: string;
  handleToggle: () => void;
}
function NavBar({ theme, handleToggle }: NavBarProps) {
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
  const navigateToHome = () => {
    navigate("/home");
  };
  return (
    <header>
      <div className={style.NavBar}>
        <div onClick={navigateToHome} className={style.Logo}>
          {theme === "light" ? <Logo /> : <LogoDarkMode />}
        </div>
        {screenSize < 767 ? (
          <>
            {!showMenu ? (
              <Button
                type="button"
                title="open menu"
                className={style.MobileMenu}
                onClick={() => setShowMenu((showMenu) => !showMenu)}
              >
                <Menu />
              </Button>
            ) : (
              <ul className={style.MobileMenuLinks}>
                 <li>
                  <Link to="/home">About</Link>
                </li>
                <li>
                  <Link to="/todo">Todo</Link>
                </li>
                <li>
                  <Link to="/toread">To Read</Link>
                </li>
                <li>
                  <div
                    className={style.CloseNavBar}
                    onClick={() => setShowMenu(false)}
                  >
                    <Close />
                  </div>
                </li>
              </ul>
            )}
          </>
        ) : (
          <div className="style.FullSizeNavBar">
              <Link to="/home">About</Link>
            <Link to="/todo">Todo</Link>
            <Link to="/toread">To Read</Link>
          </div>
        )}
        <LightDarkMode theme={theme} handleToggle={handleToggle} />
      </div>
    </header>
  );
}

export default NavBar;
