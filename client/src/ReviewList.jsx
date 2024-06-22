/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import UpdateReview from "./UpdateReview";
import DeleteForm from "./DeleteForm";
const ReviewList = (props) => {
  const { movieName, movieReview, movieRating, id } = props;
  const [openActiionButtons, setOpenActiionButtons] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleOpenActionButtons = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenActiionButtons(true);
  };

  const handleCloseActionButtons = () => {
    setOpenActiionButtons(false);
    setAnchorEl(null);
  };
  return (
    <div className="xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 border border-[#c002c0] rounded-lg min-h-[100px] p-4 shadow-xl relative">
      <MoreHorizIcon
        onClick={handleOpenActionButtons}
        color="primary"
        className="cursor-pointer absolute right-[6px] top-0"
      />

      <Popover
        open={openActiionButtons}
        anchorEl={anchorEl}
        onClose={handleCloseActionButtons}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPopover-paper": {
            padding: 1,
          },
        }}
      >
        <div className="flex flex-col gap-2">
          <Button
            className=""
            variant="outlined"
            color="primary"
            onClick={() => {
              setOpenEditDialog(true);
              setOpenActiionButtons(false);
            }}
          >
            <CreateIcon />
            Edit
          </Button>
          <Button
            className=""
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenDeleteDialog(true);
              setOpenActiionButtons(false);
            }}
          >
            <DeleteIcon />
            Delete
          </Button>
        </div>
      </Popover>

      <div className="flex flex-col gap-2 sm:items-start items-center">
        <div className="flex sm:flex-row gap-3 sm:items-start sm:justify-between flex-col items-center justify-center">
          <h1 className="sm:text-2xl text-1xl font-medium">{movieName}</h1>
          <Rating style={{ maxWidth: 150 }} value={movieRating} readOnly />
        </div>
        <p className="break-words whitespace-pre-wrap">{movieReview}</p>
      </div>

      <UpdateReview
        setOpenEditDialog={setOpenEditDialog}
        openEditDialog={openEditDialog}
      />
      <DeleteForm
        id={id}
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
      />
    </div>
  );
};

export default ReviewList;
