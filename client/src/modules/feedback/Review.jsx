/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import "@smastrom/react-rating/style.css";
import { createContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import ReviewList from "./ReviewList";
import Form from "./Form";
import { fetchReviews } from "../../redux/feedback/fetchSlice";
import { useDispatch, useSelector } from "react-redux";

export const feedbackContext = createContext(null);

const Review = () => {
  const [movieRating, setMovieRating] = useState();
  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [clickedReview, setClickedReview] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const reviews = state.reviews;

  useEffect(() => {
    dispatch(fetchReviews());
  }, []);

  useEffect(() => {
    setFeedbackList(reviews.data);
  }, [reviews.data]);

  return (
    <>
      <feedbackContext.Provider
        value={{
          setMovieName,
          setMovieReview,
          movieRating,
          setMovieRating,
          openEditDialog,
          setOpenEditDialog,
          movieName,
          movieReview,
          feedbackList,
          setClickedReview,
          clickedReview,
        }}
      >
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
      </feedbackContext.Provider>
    </>
  );
};

export default Review;
