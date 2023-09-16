import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { courseState } from "../store/atoms/course.ts";
import axios, { AxiosResponse } from "axios";

import {
  isCourseLoading,
  // courseDescription,
  courseTitle,
  courseImageLink,
  coursePrice,
  
} from "../store/selectors/course.js";



function Course() {
  const { courseId } = useParams();

  const setCourse = useSetRecoilState(courseState);

  useEffect(() => {
    axios.get(`http://localhost:3000/admin/courses/${courseId}`, {
      method: "GET",
      headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
      }
  }).then((res:AxiosResponse) => {
    //  console.log(res.data.course);
      setCourse({isLoading: false, course: res.data.course});
  })
  .catch(() => {
      setCourse({isLoading: false, course: {
        _id: null,
      title: null,
      description: null,
      imageLink: null,
      published: null,
      price: null,
      __v: null,
      }});
  });
  }, []);

  const courseLoading = useRecoilValue(isCourseLoading);


  if (courseLoading) {
    return (
      <div
        style={{
          height: "100vh",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        Loading....
      </div>
    );
  }

  return (
    <div>
      <GrayTopper />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard  />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper() {
  const title = useRecoilValue(courseTitle);
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 1,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function UpdateCard() {
  const [courseDet, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState(courseDet.course.title);
  const [description, setDescription] = useState(courseDet.course.description);
  const [image, setImage] = useState(courseDet.course.imageLink);
  const [price, setPrice] = useState(courseDet.course.price);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card variant={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>
            Update course details
          </Typography>
          <TextField
            value={title}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            value={description}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            value={image}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image link"
            variant="outlined"
          />
          <TextField
            value={price}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
            }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />

          <Button
            variant="contained"
            onClick={async () => {
              axios.put(
                "http://localhost:3000/admin/courses/" + courseDet.course._id,
                {
                  title: title,
                  description: description,
                  imageLink: image,
                  published: true,
                  price,
                },
                {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              const updatedCourse = {
                _id: courseDet.course._id,
                title: title,
                description: description,
                imageLink: image,
                price:price,
                published: true,
                __v : 0
              };
              setCourse({
                isLoading: false,
                course: updatedCourse,
              });
            }}
          >
         
            Update course
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CourseCard() {
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImageLink);

  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 0,
        }}
      >
        <img src={typeof imageLink !=="string" ? undefined : imageLink} style={{ width: 350 }}></img>
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{title}</Typography>
          <Price/>
        </div>
      </Card>
    </div>
  );
}

function Price() {
  const price = useRecoilValue(coursePrice);
  return (
    <>
      <Typography variant="subtitle2" style={{ color: "gray" }}>
        Price
      </Typography>
      <Typography variant="subtitle1">
        <b>Rs {price} </b>
      </Typography>
    </>
  );
}

export default Course;
