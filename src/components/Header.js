import React from "react";
import logo from "../assets/images/logos/icon.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="flex-row">
        <img
          onClick={() => window.location.reload()}
          src={logo}
          alt="groupomania"
        />
        <h2>Abdelhakh2514</h2>
      </div>
      <div className="metadata">
        <span className="fa fa-tag">15</span>
        <span className="fa fa-heart">69</span>
      </div>
    </header>
  );
}
