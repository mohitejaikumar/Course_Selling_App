import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {useRecoilValue,useSetRecoilState} from 'recoil';
import  {isUserLoading}  from "../store/selectors/isUserLoading.ts";
import  {userEmailState} from "../store/selectors/userEmail.ts";
import {userState} from "../store/atoms/user.ts";

function Appbar() {
  const navigate = useNavigate();

  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser  = useSetRecoilState(userState);
  
  if(userLoading){
     return (
      <>Loading...</>
     )
  }
  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 2,
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <Typography variant={"h6"}>Course Cracker</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", marginRight: 10 }}>
            <div style={{ marginRight: 10 }}>
              <Button
              onClick={() => {
                navigate("/addcourse");
              }}
              >
                Add course
              </Button>
            </div>

            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  navigate("/courses");
                }}
              >
                Courses
              </Button>
            </div>

            <Button
              variant={"contained"}
              onClick={() => {
                localStorage.setItem("token", "");
                setUser({
                  isLoading : false,
                  userEmail : null,
                })
                navigate('/');
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 0,
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <Typography variant={"h6"}>Course Cracker</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              variant={"contained"}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </Button>
          </div>
          <div>
            <Button
              variant={"contained"}
              onClick={() => {
                navigate("/signin");
              }}
            >
              Signin
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Appbar;
