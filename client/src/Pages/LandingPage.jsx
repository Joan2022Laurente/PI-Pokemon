import React from "react";
import "./landingPage.css";

export const LandingPage = () => {
  const backgrounds = [
    "https://i.pinimg.com/originals/cc/eb/2b/cceb2b0a1b015971f6a8c438e268c3a5.jpg",
    "https://i.pinimg.com/originals/0b/81/ef/0b81ef3bd67d6ea943ec950d41b7a95d.jpg",
    "https://i.pinimg.com/originals/69/82/78/698278f1a26619234112c93bb639f0a9.jpg",
    "https://i.pinimg.com/originals/56/c6/12/56c61224f0b080f64c6e07e686e0cd92.jpg",
  ];

  const getRandomBackground = () => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[randomIndex];
  };

  const BackImage = () => {
    return (
      <img className="backgroundImage" src={getRandomBackground()} alt="" />
    );
  };

  return (
    <div className="landingPage">
      <BackImage />
      <h2 className="titulo">
        Proyecto individual <span> Pokemon</span>
      </h2>
      <button className="btnLandingPage">Entrar</button>
    </div>
  );
};
