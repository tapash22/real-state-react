import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="flex justify-between p-5 bg-violet-500">
      <div>
        <Link
          to="/"
          className="text-white font-bold text-2xl uppercase tracking-widest "
        >
          {/* <img src={Logo} alt=''/> */}
          HomeLand
        </Link>
      </div>
      <div>
        <Link
          to="/signin"
          className="text-white mx-3 px-2 py-2 rounded-lg hover:bg-blue-700 "
        >
          SignIn
        </Link>
        <Link
          to="/signup"
          className="text-white bg-blue-500 mx-3 px-2 py-2 rounded-lg hover:bg-blue-700 "
        >
          SignUp
        </Link>
      </div>
    </div>
  );
}

export default Header;
