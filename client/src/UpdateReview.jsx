/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Form from "./Form";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback } from "react";

export default function UpdateReview(props) {
  const { openEditDialog, setOpenEditDialog, id } = props;

  // console.log(">>>", id);

  const handleClose = useCallback(() => {
    setOpenEditDialog(false);
  }, [setOpenEditDialog]);

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
          <Form mode="edit" id={id} />
        </DialogContent>
      </Dialog>
    </>
  );
}
