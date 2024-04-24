import { addDoc, collection, getDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../config/firebase.config";
import { AuthContext } from "../context/Auth.context";
import Login from "../auth/Login";
import { useNavigate } from "react-router-dom";
const AddCourse = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const collectionRef = collection(db, "courses");
      const newData = await addDoc(collectionRef, formData);
      setLoading(false);
      navigate("/allcourses");
      const dataSnap = await getDoc(newData);
      console.log(dataSnap.data());
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      {user ? (
        <div>
          <p className="flex justify-center text-2xl font-bold ">Add Course </p>
          <div className="flex flex-col mt-12   justify-center items-center  ">
            <input
              required
              placeholder="Enter the Course Name "
              className="input "
              type="text"
              id="name"
              onChange={handleChange}
            />
            <input
              required
              placeholder="Enter the Course Code "
              className="input "
              type="text"
              id="code"
              onChange={handleChange}
            />

            <input
              required
              placeholder="Enter the Course Price "
              className="input "
              type="Number"
              id="price"
              onChange={handleChange}
            />
            <input
              required
              id="duration"
              placeholder="Enter the Course Duration"
              className="input "
              type="number"
              onChange={handleChange}
            />

            <input
              required
              id="description"
              placeholder="Enter the Course Description "
              className="input "
              type="text"
              onChange={handleChange}
            />

            <input
              id="schedule"
              required
              placeholder="Enter the Course Schedule "
              className="input "
              type="time"
              onChange={handleChange}
            />

            <input
              id="teacher"
              required
              placeholder="Enter the Course Teacher's Name  "
              className="input "
              type="text"
              onChange={handleChange}
            />
            <button onClick={handleSubmit} className="btn w-[80%] md:w-[40%] md:text-2xl">
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
};

export default AddCourse;
