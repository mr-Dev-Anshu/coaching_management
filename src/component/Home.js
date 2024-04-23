import React, { useContext } from "react";
import Login from "../auth/Login";
import { AuthContext } from "../context/Auth.context";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      {user ? (
        <div className="w-full flex justify-center ">
          <div className="w-[80%] ">
            <Link to={"/addcourse"}>
              <button className="btn w-full ">Add Course </button>{" "}
            </Link>
            <button className="btn w-full ">All Courses </button>
            <button className="btn w-full ">Add Student</button>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
