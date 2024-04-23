import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth.context";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.config";
import Login from "../auth/Login";

const AllCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  // Function to fetch courses from Firestore
  const getCourses = async () => {
    const dataSnap = await getDocs(collection(db, "courses"));
    let newData = [];
    dataSnap.forEach((doc) => {
      newData.push(doc.data());
    });
    setCourses(newData);
    console.log(newData);
  };

  useEffect(() => {
    getCourses();
  }, [user]);

  return (
    <div>
      {user ? (
        <div className="md:flex md:flex-row flex flex-col  md:gap-4 md:flex-wrap md:justify-center justify-center items-center  space-y-4 ">
         
          {courses.map((course) => (
            <div
              key={course.id}
              className="w-[90%] outline md:w-[20%] p-6 bg-white shadow-xl border-none rounded-lg h-[350px] "
            >
              <p className="text-4xl  text-slate-700  flex justify-center font-bold ">
                {course.name}
              </p>
              <p className="text-2xl text-slate-400  font-medium mt-2 flex justify-center">
                Teacher: {course.teacher}
              </p>
              <p className="text-2xl text-slate-400  font-medium mt-2 flex justify-center">
                Duration: {course.duration}
              </p>
              <p className="text-2xl  text-slate-400 font-medium mt-2 flex justify-center">
                Schedule: {course.schedule}
              </p>
              <p className="text-2xl  text-slate-400 font-medium mt-2 flex justify-center">
                Code : {course.code}
              </p>
              <p className="text-2xl text-slate-400  font-medium mt-2 flex justify-center">
                Price: <span className="text-slate-400">{course.price}</span>
              </p>
              <p className="text-2xl font-medium flex justify-center">
                <button className="btn px-1 w-[70%] md:w-fit">
                  View all Students
                </button>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
};

export default AllCourses;
