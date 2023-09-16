import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState}  from '../store/atoms/user.ts';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser  = useSetRecoilState(userState);
  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Course Cracker. Signin below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(evant11) => {
              const elemt = evant11.target;
              setEmail(elemt.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />

          <Button
            size={"large"}
            
            variant="contained"
            onClick={async () => {

              try{
              const res = await axios.post(
                "http://localhost:3000/admin/login",
                
                {
                
                    username: email,
                    password: password,
                
                }
              );
              const data = res.data;

              localStorage.setItem("token", data.token);
            
              setUser({
                isLoading : false,
                userEmail : email,
              })
              navigate('/courses');
              }
              catch{
                alert("Invalid Email OR Password");
              }
            }}
          >
            
            Sign In
          </Button>
        </Card>
      </div>
    </div>
  );
}
export default Signin;