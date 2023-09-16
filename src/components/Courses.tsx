import { Button, Typography, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios , {AxiosResponse} from "axios";
import {CourseType} from "../typedef";

function Courses() {
 
  const [courses, setCourses] = useState<CourseType[]>([]);
  useEffect(() => {
   
    function callback1(res :AxiosResponse) {
      setCourses(res.data.courses);
    }
    axios.get("http://localhost:3000/admin/courses", {
 
      headers: {
        authorization: "Bearer " + (localStorage.getItem("token")),
      },
    }).then(callback1);
  }, []);
  return (
    <div
      style={
        { display: "flex",
         flexWrap: "wrap",
          justifyContent: "center" 
          }}>
    
      {courses.map((course) => {
        return <Course course={course} />;
      })}

    </div>
  );
}
export function Course(props:{course:CourseType}) {
  const course = props.course;
  const navigate = useNavigate();
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
      if()
      <img src ={typeof course.imageLink !== "string"? undefined : course.imageLink} style={{ width: 300 }}></img>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/course/" + course._id);
          }}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
}
export default Courses;
