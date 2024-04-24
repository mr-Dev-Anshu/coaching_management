import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Header from "./component/Header";
import Login from "./auth/Login";
import Verify from "./auth/Verify";
import AddCourse  from "./component/AddCourse";
import AllCourses from "./component/AllCourses";
function App() {
  return (
    <div className="mb-6">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Verify" element={<Verify />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/allcourses" element={<AllCourses />} />
      </Routes>
    </div>
  );
}

export default App;
