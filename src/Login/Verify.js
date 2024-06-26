import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth.context";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  const { VerifyOPT, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const handleVerification = () => {
    try {
      setLoading(true);
      VerifyOPT(otp);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <p className="text-xl md:text-4xl  text-center mt-4  text-slate-700 font-bold">
          Verify the Otp
        </p>
        <div className="flex flex-col   justify-center h-[400px] items-center  ">
          <input
            placeholder=" Enter the Otp  Number "
            onChange={(e) => setOtp(e.target.value)}
            className="border-b-4 border-slate-700 md:px-12 py-2 px-2   focus:outline-none text-xl   w-[80%]   placeholder:text-xl md:w-[600px]"
            type="text"
          />
          <div id="recaptcha-container"></div>
          <button
            onClick={handleVerification}
            className="bg-slate-700 py-2 px-12  md:w-[20%] md:text-2xl  rounded-md text-white mt-6 "
          >
            {" "}
            {loading ? "Loading..." : "Verify Otp "}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
