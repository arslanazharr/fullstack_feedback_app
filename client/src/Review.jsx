/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import "@smastrom/react-rating/style.css";
import { createContext, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import ReviewList from "./ReviewList";
import Form from "./Form";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c002c0",
    },
  },
});

export const feedbackContext = createContext(null);

const Review = () => {
  const [movieRating, setMovieRating] = useState();
  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const submitReview = () => {
    const obj = {
      movieName: movieName,
      movieReview: movieReview,
      movieRating: movieRating,
    };
    setFeedbackList((prev) => [...prev, obj]);
    console.log(feedbackList);
  };

  const check =
    movieName?.length > 0 &&
    movieRating?.toString().length > 0 &&
    movieReview?.length > 0;

  return (
    <>
      <feedbackContext.Provider
        value={{
          setMovieName,
          setMovieReview,
          movieRating,
          setMovieRating,
          submitReview,
          check,
          movieName,
          movieReview,
        }}
      >
        <ThemeProvider theme={theme}>
          <div className="p-4">
            <div className="flex justify-center w-full">
              <div className="flex flex-col justify-center items-center sm:w-[450px] w-full bg-purple-200 py-10 px-5 rounded-lg shadow-xl">
                <h1 className="text-center text-3xl font-medium text-[#c002c0] mb-8">
                  Movie Review
                </h1>
                <Form />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 my-10">
              {feedbackList.map((obj, index) => (
                <ReviewList
                  key={index}
                  movieName={obj.movieName}
                  movieRating={obj.movieRating}
                  movieReview={obj.movieReview}
                />
              ))}
            </div>
          </div>
        </ThemeProvider>
      </feedbackContext.Provider>
    </>
  );
};

export default Review;
