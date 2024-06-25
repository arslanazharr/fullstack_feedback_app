/* eslint-disable react/prop-types */
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/auth/signupSlice";
import { signin } from "../../../redux/auth/signinSlice";
import { useNavigate } from "react-router-dom";

const Form = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let obj;

    try {
      if (props.mode === "signup") {
        obj = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        };

        await dispatch(signup(obj)).then((res) => {
          const { userId, firstName, lastName } = res.payload;
          window.localStorage.setItem("userId", userId);
          window.localStorage.setItem("userName", `${firstName} ${lastName}`);

          if (userId) {
            navigate("/");
          }
        });
      } else {
        obj = { email: email, password: password };

        await dispatch(signin(obj)).then((res) => {
          const { userId, firstName, lastName } = res.payload;
          window.localStorage.setItem("userId", userId);
          window.localStorage.setItem("userName", `${firstName} ${lastName}`);

          if (userId) {
            navigate("/");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 items-center w-full">
        {props.mode === "signup" && (
          <>
            <TextField
              label="First Name"
              variant="filled"
              fullWidth
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              color="primary"
            />
            <TextField
              label="Last Name"
              variant="filled"
              fullWidth
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              color="primary"
            />
          </>
        )}
        <TextField
          label="Email"
          variant="filled"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          color="primary"
          type="email"
        />
        <TextField
          label="Password"
          variant="filled"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          color="primary"
          type="password"
        />
        <Button
          variant="outlined"
          size="large"
          fullWidth
          color="primary"
          onClick={handleSubmit}
        >
          {props.mode === "signup" ? "Signup" : "Login"}
        </Button>
      </div>
    </>
  );
};

export default Form;
