import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full bg-indigo-600 py-2 mb-4">
      <nav className="max-w-4xl w-full flex mx-auto justify-between items-center text-white">
        <Link to="/">
          <h1 className="text-2xl font-semi-bold">NAVBAR</h1>
        </Link>

        <ul className="flex gap-4 ">
          <li>
            <Link to="/login">LOGIN </Link>
          </li>
          <li>
            <Link to="/signup">SIGNUP</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
