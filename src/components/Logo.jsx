import React from "react";
import crazyCoffeeImg from "../assets/crazy_coffee.jpeg";

function Logo({ className = "" }) {
  return (
    <div className="logo-container">
      <img
        src={crazyCoffeeImg}
        alt="Crazy Coffee Take"
        className={` ${className} h-auto object-contain`}
        loading="lazy"
      />
    </div>
  );
}

export default Logo;
