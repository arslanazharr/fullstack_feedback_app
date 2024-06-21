/* eslint-disable react/prop-types */
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Button from "@mui/material/Button";
import { top100Films } from "./constants";
import { useContext } from "react";
import { feedbackContext } from "./Review";

const Form = () => {
  const {
    setMovieName,
    setMovieReview,
    movieRating,
    setMovieRating,
    submitReview,
    check,
  } = useContext(feedbackContext);
  return (
    <>
      <div className="flex flex-col gap-5 items-center w-full">
        <Autocomplete
          freeSolo
          options={top100Films?.map((option) => option)}
          onChange={(event, newValue) => {
            setMovieName(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Movie Name"
              onChange={(e) => setMovieName(e.target.value)}
              variant="filled"
              color="primary"
            />
          )}
          fullWidth
        />
        <TextField
          label="Write a review"
          multiline
          rows={4}
          variant="filled"
          fullWidth
          onChange={(e) => setMovieReview(e.target.value)}
          color="primary"
        />
        <Rating
          style={{ maxWidth: 250 }}
          value={movieRating}
          onChange={setMovieRating}
        />
        <Button
          variant="outlined"
          size="large"
          fullWidth
          color="primary"
          onClick={submitReview}
          disabled={!check}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default Form;
