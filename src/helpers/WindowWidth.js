import { useEffect, useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return {
    width,
  };
}

export default function WindowWidth() {
  const [windowWidth, setWindowWidth] = useState(getWindowDimensions());
  useEffect(() => {
    function setWidth() {
      setWindowWidth(getWindowDimensions());
    }

    window.addEventListener(
      "resize",
      window.addEventListener("resize", setWidth)
    );
    setWidth();
    return () => window.removeEventListener("resize", setWidth);
  }, []);

  return windowWidth;
}
