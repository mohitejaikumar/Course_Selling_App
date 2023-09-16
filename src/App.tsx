import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Course from "./components/Course";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AddCourse from "./components/AddCourse";
import Courses from "./components/Courses";
import Landing from "./components/Landing";
import { useSetRecoilState } from "recoil";
import {userState} from "./store/atoms/user.js";
import axios from "axios";
import { useEffect } from "react";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Appbar></Appbar>
        <InitUser></InitUser>
        <Routes>
          <Route path={"/addcourse"} element={<AddCourse />}></Route>
          <Route path={"/signup"} element={<Signup />}></Route>
          <Route path={"/signin"} element={<Signin />}></Route>
          <Route path={"/"} element={<Landing />}></Route>
          <Route path={"/courses"} element={<Courses />}></Route>
          <Route path={"/course/:courseId"} element={<Course />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function InitUser() {
  const setUser = useSetRecoilState(userState);

  async function init(){
    try {
      const res = await axios.get("http://localhost:3000/admin/me", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        }
      });
     
      if (res.data.username) {
        setUser({
          isLoading: false,
          userEmail: res.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  }

  useEffect(() => {
    init();
  },[])

  return (
    <></>
  )
}
export default App;
