/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Form from "./Form";
import CloseIcon from "@mui/icons-material/Close";

export default function UpdateReview(props) {
  const { openEditDialog, setOpenEditDialog } = props;

  const handleClose = () => {
    setOpenEditDialog(false);
  };

  return (
    <>
      <Dialog open={openEditDialog} onClose={handleClose}>
        <DialogTitle>
          <div className="flex flex-row justify-between items-center">
            <p>Edit Review</p>
            <CloseIcon
              onClick={() => setOpenEditDialog(false)}
              className="cursor-pointer"
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <Form />
        </DialogContent>
      </Dialog>
    </>
  );
}
