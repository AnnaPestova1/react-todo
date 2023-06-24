import React from "react";

function About() {
  React.useEffect(() => {
    if (window.location.pathname === "/about") {
      document.body.style.backgroundImage =
        "url('./pexels-cottonbro-studio-5191390.jpg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }
  }, []);
  return <div></div>;
}

export default About;
