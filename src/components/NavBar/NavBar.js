import { Link } from "react-router-dom";
import { ReactComponent as Menu } from "../../img/menu_FILL0_wght400_GRAD0_opsz48.svg";
import style from "./NavBar.module.css";

function NavBar() {
  return window.innerWidth < 991 ? (
    <Menu />
  ) : (
    <div className={style.NavBar}>
      <Link to="/home">Home</Link>
      <Link to="/new">Todo</Link>
    </div>
  );
}

export default NavBar;
