/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import "@smastrom/react-rating/style.css";
import { createContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import ReviewList from "./ReviewList";
import Form from "./Form";
import axios from "axios";

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

  useEffect(() => {
    axios.get("http://localhost:3001/api/get").then((res) => {
      const data = res?.data;
      setFeedbackList(data);
    });
  }, []);

  const submitReview = () => {
    const obj = {
      movieName: movieName,
      movieReview: movieReview,
      movieRating: movieRating,
    };

    axios.post("http://localhost:3001/api/add", obj).then((res) => {
      console.log("response", res?.data);
      const data = res?.data;
      setFeedbackList((prev) => [...feedbackList, data]);
    });
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
            {feedbackList?.length > 0 ? (
              <div className="grid grid-cols-12 gap-4 my-10">
                {feedbackList?.map((obj, index) => (
                  <ReviewList
                    key={obj?.id}
                    id={obj?.id}
                    movieName={obj?.movieName}
                    movieRating={obj?.movieRating}
                    movieReview={obj?.movieReview}
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center w-full p-20">
                <h1 className="text-3xl">No Reviews Found</h1>
              </div>
            )}
          </div>
        </ThemeProvider>
      </feedbackContext.Provider>
    </>
  );
};

export default Review;
