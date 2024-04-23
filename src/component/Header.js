import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="flex  justify-center md:text-2xl bg-slate-700 text-white font-semibold py-4 items-center mb-12 ">
        <ul className="flex w-full md:px-20 px-2 items-center justify-between ">
          <Link to={"/"}>
            {" "}
            <li>Home</li>{" "}
          </Link>

          {user ? (
            <li>{user.phoneNumber}</li>
          ) : (
            <Link to={"/login"}>
              <li>Login</li>
            </Link>
          )}
          {user ? (
            <Link to={"/allcourses"}>
              <li>See all Courses</li>
            </Link>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Header;
