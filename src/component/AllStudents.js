import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase.config";
import { AuthContext } from "../context/Auth.context";
import Login from "../auth/Login";
const AllStudents = () => {
  const { code } = useParams();
  const { user } = useContext(AuthContext);
  console.log(code);
   const [data , setData] = useState()
  const getData = async () => {
    const q = query(collection(db, "students"), where("course", "==", code));
    const dataSnap = await getDocs(q);
    let newData = [];
    dataSnap.forEach((doc) => {
      newData.push(doc.data());
      console.log(doc.data());
    });
    // console.log(newData);
     setData(newData) ;
  };
  useEffect(() => {
    if (user) {
      getData();
    }
  } );
  return (
    <>
    {user? <div>
      <p className="text-center md:py-12 py-6    md:text-4xl text-3xl font-bold   ">
        Course: {code}
      </p>
      <div className="flex justify-center flex-col items-center space-y-4">
           {  data?
             data.map((ele)=> (
              <div className=" px-4 md:px-6 md:text-2xl  md:py-6 py-3  font-bold bg-white shadow-xl w-[80%] rounded-lg ">
              <div className="flex justify-between  items-center ">
                <span className="text-green-900"> Name</span>
                <span className="text-green-900"> Id  </span>
                <span className="text-green-900"> Pending </span>
              </div>
              <div className="flex justify-between items-center ">
                <span className="text-green-500 max-w-9 "> {ele.name} </span>
                <span className="text-green-500 "> {ele.id} </span>
                <span className="text-red-500"> {ele.pending} </span>
              </div>
              <div className="text-center">
                <button className="bg-green-500 mt-2 md:mt-4  md:text-2xl py-1 px-12 rounded  ">
                  Pay
                </button>
              </div>
            </div>
             )) : <div className="text-2xl flex justify-center h-screen items-center text-green-500 font-bold">Loading...</div> 
           }
      </div>
    </div>:<Login/>}
    </>
   
  );
};
export default AllStudents;
