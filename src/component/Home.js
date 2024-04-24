import React, { useContext } from "react";
import Login from "../auth/Login";
import { AuthContext } from "../context/Auth.context";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

     const handleLogout = async () => {
         await  signOut(auth)
         window.location.href="/" ; 
     }
  return (
    <div>
      {user ? (
        <div className="w-full flex   justify-center ">
          <div className="w-[80%] md:w-full md:flex md:flex-col  md:justify-center md:items-center  ">
            <Link to={"/addcourse"}>
              <button className="btn  w-full md:w-fit  md:text-2xl md:font-bold md:min-w-[800px]   ">Add Course </button>{" "}
            </Link>
            <Link to={"/allcourses"}>
              <button className="btn   w-full md:w-fit  md:text-2xl md:font-bold md:min-w-[800px] ">All Courses </button>
            </Link>
            <Link>
              <button className="btn   w-full md:w-fit  md:text-2xl md:font-bold md:min-w-[800px] ">Add Student</button>
            </Link>
            <button onClick={handleLogout} className="btn   w-full md:w-fit  md:text-2xl md:font-bold md:min-w-[800px] "> Logout</button>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
