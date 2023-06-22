import React from "react";

function NotFound() {
  React.useEffect(() => {
    if (window.location.pathname === "/404") {
      //document.body.style.backgroundColor = "red";
      document.body.style.backgroundImage =
        "url('./pexels-gül-işık-4066276.jpg')";
    }
  }, []);
  return <h1>Error 404: Page not found</h1>;
}

export default NotFound;
