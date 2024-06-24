import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import Popover from "@mui/material/Popover";
import { useCallback, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = () => {
  const [openActiionButtons, setOpenActiionButtons] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const minScreenSize = useMediaQuery("(min-width:640px)");

  const handleOpenActionButtons = useCallback((event) => {
    setAnchorEl(event.currentTarget);
    setOpenActiionButtons(true);
  }, []);

  const handleCloseActionButtons = useCallback(() => {
    setOpenActiionButtons(false);
    setAnchorEl(null);
  }, []);

  return (
    <div className="shadow-xl bg-[#e9d5ff] p-6 flex flex-row items-center justify-between">
      <h1 className="sm:text-3xl text-2xl text-[#c002c0] font-semibold">
        Movie Review
      </h1>
      <div className="flex flex-row items-center gap-4">
        <ul className="flex flex-row gap-4 items-center whitespace-nowrap">
          <NavLink to="/login">
            <Button variant="outlined" size="medium" fullWidth color="primary">
              Login
            </Button>
          </NavLink>
          <NavLink to="/signup">
            <Button variant="contained" size="medium" fullWidth color="primary">
              Sign up
            </Button>
          </NavLink>
          {minScreenSize && (
            <Button variant="contained" size="medium" fullWidth color="primary">
              Sign out
            </Button>
          )}
        </ul>
        <Avatar
          sx={{ bgcolor: "#c002c0" }}
          className="!text-[#e9d5ff] cursor-pointer"
          onClick={handleOpenActionButtons}
        >
          AA
        </Avatar>
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
              variant="contained"
              color="primary"
              onClick={() => {
                // setOpenEditDialog(true);
                setOpenActiionButtons(false);
              }}
            >
              Sign out
            </Button>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
