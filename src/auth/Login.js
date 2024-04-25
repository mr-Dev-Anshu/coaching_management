import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../config/firebase.config";
import { AuthContext } from "../context/Auth.context";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState();
  const [formData, setFormData] = useState();
  const {setUser} = useContext(AuthContext)
  const navigate = useNavigate() ; 
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (
        !formData?.userid ||
        !formData?.password ||
        formData?.userid.trim() === "" ||
        formData?.password.trim() === ""
      ) {
        console.log("Please fill the form");
        setMessage("Please fill the form");
        setLoading(false)
        return;
      }

      const q = query(
        collection(db, "admin"),
        where("userid", "==", formData.userid)
      );

      const dataSnap = await getDocs(q);

      let data;
      dataSnap.forEach((doc) => {
        data = doc.data();
      });
      setUser(data) ;
      navigate("/")
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessage(error?.message);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };
  return (
    <div>
      <div className="flex justify-center items-center h-[400px] flex-col space-y-12 ">
        <p className="text-xl md:text-4xl  text-center mt-4  text-slate-700 font-bold ">
          Login as a Admin{" "}
        </p>
        <div className="flex flex-col   md:space-y-12 space-y-4   justify-center  items-center md:w-[50%] w-[80%] shadow-lg  md:mx-0 bg-white  p-12  ">
          <input
            placeholder="Enter User id"
            id="userid"
            onChange={handleChange}
            className="border-b-4 border-slate-700 px-2 py-2  md:placeholder:text-2xl md:text-2xl focus:outline-none text-xl   w-full   placeholder:text-xl md:w-[600px] "
            type="text"
          />
          <input
            id="password"
            placeholder="Enter the Password"
            onChange={handleChange}
            className="border-b-4 border-slate-700 px-2 py-2 md:placeholder:text-2xl md:text-2xl focus:outline-none text-xl   w-full   placeholder:text-xl md:w-[600px] "
            type="password"
          />
          <button
            onClick={handleLogin}
            className="bg-slate-700 py-2 px-12  md:text-2xl  rounded-md text-white mt-6  "
          >
            {loading ? "Loading..." : "Login"}{" "}
          </button>
          <div className="text-red-600 text-2xl">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
