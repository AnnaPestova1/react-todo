import React, { ReactNode } from "react";
import style from "./Button.module.css";

interface ButtonProp {
  className?: string;
    active?: boolean;
    type: 'submit' | 'reset' | 'button' | undefined;
    title: string;
    onClick: () => void;
    children: ReactNode;
}
//standart button in app
function Button({ active, type, title, onClick, children }: ButtonProp) {
  return (
    <button
      className={active ? style.Active : style.AllButtons}
      type={type}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}


export default Button;
