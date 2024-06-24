/* eslint-disable react/prop-types */
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Button from "@mui/material/Button";
import { top100Films } from "./constants";
import { useCallback, useContext, useEffect, useState } from "react";
import { feedbackContext } from "./Review";
import { useDispatch } from "react-redux";
import { updateReview } from "../../redux/feedback/updateSlice";
import { fetchReviews } from "../../redux/feedback/fetchSlice";
import { postReview } from "../../redux/feedback/postSlice";

const Form = (props) => {
  const [editedRating, setEditedRating] = useState();
  const dispatch = useDispatch();

  const {
    setMovieName,
    setMovieReview,
    feedbackList,
    movieReview,
    movieName,
    setOpenEditDialog,
    clickedReview,
  } = useContext(feedbackContext);

  const findFeedbackById = (id) => {
    return feedbackList?.find((feedback) => feedback?.id === id);
  };

  const feedback = findFeedbackById(clickedReview);

  console.log("feedback", feedback);

  const handleMovieNameChange = useCallback(
    (event, newValue) => {
      setMovieName(newValue);
    },
    [setMovieName]
  );

  const handleReviewChange = useCallback(
    (e) => {
      setMovieReview(e.target.value);
    },
    [setMovieReview]
  );

  const handleRatingChange = useCallback((newRating) => {
    setEditedRating(newRating);
  }, []);

  useEffect(() => {
    if (props.mode === "edit" && feedback) {
      setEditedRating(feedback.movieRating);
    }
  }, [props.mode, feedback]);

  const submitReview = async () => {
    try {
      const obj = {
        movieName: movieName || feedback.movieName,
        movieReview: movieReview || feedback.movieReview,
        movieRating: editedRating || feedback.movieRating,
      };
      if (props.mode === "edit") {
        await dispatch(updateReview({ obj, id: clickedReview }));
        await dispatch(fetchReviews());
        await setOpenEditDialog(false);

        console.log("edit worked");
      } else {
        await dispatch(postReview(obj));
        await dispatch(fetchReviews());
        console.log("normal worked");
      }
    } catch (error) {
      console.error("Failed to submit the review and fetch reviews:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 items-center w-full">
        <Autocomplete
          freeSolo
          options={top100Films?.map((option) => option)}
          onChange={handleMovieNameChange}
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
          defaultValue={props.mode === "edit" ? feedback.movieName : ""}
        />
        <TextField
          label="Write a review"
          multiline
          rows={4}
          variant="filled"
          fullWidth
          onChange={handleReviewChange}
          color="primary"
          defaultValue={props.mode === "edit" ? feedback.movieReview : ""}
        />
        <Rating
          style={{ maxWidth: 250 }}
          value={editedRating}
          onChange={handleRatingChange}
        />
        <Button
          variant="outlined"
          size="large"
          fullWidth
          color="primary"
          onClick={submitReview}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default Form;
