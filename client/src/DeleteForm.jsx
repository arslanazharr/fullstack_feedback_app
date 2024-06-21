/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const DeleteForm = (props) => {
  const { openDeleteDialog, setOpenDeleteDialog } = props;

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };
  return (
    <Dialog open={openDeleteDialog} onClose={handleClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <div className="flex flex-row gap-2">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDeleteDialog(false)}
          >
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
