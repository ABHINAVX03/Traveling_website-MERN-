import React, { useState,useEffect } from "react";

import Header from "../Header/Header";
import Routers from "../../router/Routers";
import Footer from "../Footer/Footer";

const Layout = () => {
  
  const savedMode = localStorage.getItem('mode') || "light";
  const savedColor = localStorage.getItem('color') || "dark";
  const savedLogo = localStorage.getItem('logo') || "sun";

  const [mode, setMode] = useState(savedMode);
  const [color, setColor] = useState(savedColor);
  const [logo, setLogo] = useState(savedLogo);
  
  const togglemode = () => {
    if (mode === "dark") {
      setMode("light");
      setColor("dark");
      setLogo('sun')
      
    } else {
      setMode("dark");
      setColor("light");
      setLogo('moon')
      
    }
    toggleBackgroundColor()
  };
  const [backgroundColor, setBackgroundColor] = useState(() => {
    return localStorage.getItem("backgroundColor") || "white";
  });

  useEffect(() => {
    // Set the background color of the body and update localStorage
    document.body.style.backgroundColor = backgroundColor;
    localStorage.setItem("backgroundColor", backgroundColor);
  }, [backgroundColor]);

  const toggleBackgroundColor = () => {
    setBackgroundColor((prevColor) => (prevColor === "white" ? "#121212" : "white"));
  };

  useEffect(() => {
    localStorage.setItem('mode', mode);
    localStorage.setItem('color', color);
    localStorage.setItem('logo', logo);
  }, [mode, color, logo]);
  return (
    <>
      <Header togglemode={togglemode} mode={mode} color={color} logo={logo}/>
      <Routers mode={mode} color={color}/>
      <Footer mode={mode} color={color} />
    </>
  );
};

export default Layout;
