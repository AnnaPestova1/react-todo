import React from "react";
import { ReactComponent as GitHubLogo } from "../../img/github-mark.svg";
import style from "./Footer.module.css";

function Footer() {
  //current year
  const today = new Date();
  const thisYear = today.getFullYear();

  return (
    <footer>
      <p className={style.CopyRight}>© Anna Pestova {thisYear}</p>
      <div className={style.Links}>
        <ul>
          <li className={style.GitHub}>
            <a
              href="https://github.com/AnnaPestova1"
              target="_blank"
              rel="noreferrer"
              className={style.GitHubLogo}
            >
              <GitHubLogo />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
