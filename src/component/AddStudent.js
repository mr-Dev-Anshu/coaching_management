import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context";
import Login from "../auth/Login";
import { coursesContext } from "../context/Courses.context";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase.config";

const AddStudent = () => {
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState();
  const { user } = useContext(AuthContext);
  const { courses } = useContext(coursesContext);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    try {
        setLoading(true)
      e.preventDefault();
      let course;
      if (courses) {
        course = courses.find((ele) => ele.code === formData.course);
      }
      const course_price = course.price - 0;
      formData.pending = course_price - (formData.pay - 0);
      const collectionRef = collection(db, "students");
      const newDoc = await addDoc(collectionRef, formData);
      console.log(newDoc);
      setLoading(false)
    } catch (error) {
        setLoading(false)
      console.log(error);
    }
  };
  return (
    <>
      {user && courses ? (
        <div>
          <p className="flex justify-center text-2xl font-bold ">
            Add Student{" "}
          </p>
          <div className="flex flex-col mt-12   justify-center items-center  ">
            <input
              required
              placeholder="Enter the Student's Name "
              className="input "
              type="text"
              id="name"
              onChange={handleChange}
            />
            <select
              onChange={handleChange}
              className="input"
              name=""
              id="course"
            >
              <option value=""> Select the course </option>
              {courses.map((ele) => (
                <option value={ele.code}>{ele.code}</option>
              ))}
            </select>

            <input
              required
              placeholder="Enter the Payment "
              className="input "
              type="Number"
              id="pay"
              onChange={handleChange}
            />
            <input
              required
              id="id"
              placeholder="Enter the Student id "
              className="input "
              type="Number"
              onChange={handleChange}
            />
            <button
              onClick={handleSubmit}
              className="btn w-[80%] md:w-[40%] md:text-2xl"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default AddStudent;
