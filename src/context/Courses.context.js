import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase.config";
import { AuthContext } from "./Auth.context";

export const coursesContext = createContext();

export const CoursesContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState();
  const getCourseData = async () => {
    const collectionRef = collection(db, "courses");
    const dataSnap = await getDocs(collectionRef);
    let newData = [];
    dataSnap.forEach((doc) => {
      newData.push(doc.data());
    });
    setCourses(newData);
  };
  useEffect(() => {
    if (user) {
      getCourseData();
    }
  }, [user]);
  return (
    <coursesContext.Provider value={{ courses }}>
      {children}
    </coursesContext.Provider>
  );
};
