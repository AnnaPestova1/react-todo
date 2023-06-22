import React from "react";

function About() {
  React.useEffect(() => {
    if (window.location.pathname === "/about") {
      //document.body.style.backgroundColor = "red";
      document.body.style.backgroundImage =
        "url('./pexels-cottonbro-studio-5191390.jpg')";
    }
  }, []);
  return <div></div>;
}

export default About;
