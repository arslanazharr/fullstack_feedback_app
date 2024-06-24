/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { deleteReview } from "../redux/deleteSlice";
import { fetchReviews } from "../redux/fetchSlice";

const DeleteForm = (props) => {
  const { openDeleteDialog, setOpenDeleteDialog, id } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteReview(id));
      await dispatch(fetchReviews());
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Failed to delete the review and fetch reviews:", error);
    }
  };

  return (
    <Dialog open={openDeleteDialog} onClose={handleClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <div className="flex flex-row gap-2">
          <Button variant="contained" color="primary" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenDeleteDialog(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteForm;
