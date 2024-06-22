/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import axios from "axios";

const DeleteForm = (props) => {
  const { openDeleteDialog, setOpenDeleteDialog, id } = props;

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/api/delete/${id}`);
    setOpenDeleteDialog(false);
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
