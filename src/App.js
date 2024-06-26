import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Header from "./component/Header";
import AddCourse  from "./component/AddCourse";
import AllCourses from "./component/AllCourses";
import AddStudent from "./component/AddStudent";
import AllStudents from "./component/AllStudents";
import Login from "./auth/Login";
function App() {
  return (
    <div className="mb-6">
      <Header/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={< Login
         />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/allstudents/:code" element={<AllStudents />} />
      </Routes>
    </div>
  );
}

export default App;
