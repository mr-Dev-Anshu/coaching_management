import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { admin } from "../data/AdminData";
export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const { loginWithPhone } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message,setMessage] = useState() ; 
  const handleLogin = async (e) => {
    setLoading(true);
    setMessage("") ; 
    e.preventDefault();
    try {
      if (phone === "" || phone == null) {
        setLoading(false) 
        setMessage("Please Enter the valid  Phone number ");
      }
      const found = admin.find(ele => {
        console.log("Element in array:", ele);
        console.log("Phone number:", phone);
        return ele === phone;
      });
      if(!found){
         setMessage(" Invalid User !  ")
         setLoading(false)
         return ; 
      }
      await loginWithPhone(phone);
      console.log("reCAPTCHA setup complete");
      setLoading(false);
      navigate("/verify");
    } catch (error) {
      setMessage("") ; 
      console.error("Error setting up reCAPTCHA:", error);
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <p className="text-xl md:text-4xl  text-center mt-4  text-slate-700 font-bold ">
          Login as a Admin{" "}
        </p>
        <div className="flex flex-col   justify-center h-[400px] items-center  ">
          <input
          placeholder=" Enter the Phone Number "
          onChange={(e)=> setPhone(e.target.value)}
            className="border-b-4 border-slate-700 px-2 py-2  focus:outline-none text-xl   w-[80%]   placeholder:text-xl md:w-[600px] "
            type="text"
          />
        <div id="recaptcha-container"></div>
        <button onClick={handleLogin} className="bg-slate-700 py-2 px-12  md:w-[20%] md:text-2xl  rounded-md text-white mt-6  "> {  loading?"Loading...": "Get Otp"} </button>
        <div className="text-red-600 text-2xl">{message}</div>
        </div>
      </div>
    </>
  );
}
