import React from "react";
import { Link } from "react-router-dom";
import  "./navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/crear">Crear</Link>
        </li>
      </ul>
    </nav>
  );
};
