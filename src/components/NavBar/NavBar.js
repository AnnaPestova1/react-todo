import react, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Menu } from "../../img/menu_FILL0_wght400_GRAD0_opsz48.svg";
import style from "./NavBar.module.css";
console.log(document);
function NavBar() {
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
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/new">Todo</Link>
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
          <Link to="/home">Home</Link>
          <Link to="/new">Todo</Link>
        </>
      )}
    </div>
  );
}

export default NavBar;
