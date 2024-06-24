/* eslint-disable react/prop-types */
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/auth/signupSlice";
import { signin } from "../../../redux/auth/signinSlice";

const Form = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

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
        await dispatch(signup(obj));
      } else {
        // eslint-disable-next-line no-unused-vars
        obj = { email: email, password: password };
        await dispatch(signin(obj));
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
              // defaultValue={props.mode === "edit" ? feedback.movieReview : ""}
            />
            <TextField
              label="Last Name"
              variant="filled"
              fullWidth
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              color="primary"
              // defaultValue={props.mode === "edit" ? feedback.movieReview : ""}
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
          // defaultValue={props.mode === "edit" ? feedback.movieReview : ""}
        />
        <TextField
          label="Password"
          variant="filled"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          color="primary"
          type="password"
          // defaultValue={props.mode === "edit" ? feedback.movieReview : ""}
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
