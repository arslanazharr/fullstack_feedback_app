import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import Popover from "@mui/material/Popover";
import { useCallback, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [openActiionButtons, setOpenActiionButtons] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const minScreenSize = useMediaQuery("(min-width:640px)");
  const userId = window.localStorage.getItem("userId");
  const userName = window.localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleOpenActionButtons = useCallback((event) => {
    setAnchorEl(event.currentTarget);
    setOpenActiionButtons(true);
  }, []);

  const handleCloseActionButtons = useCallback(() => {
    setOpenActiionButtons(false);
    setAnchorEl(null);
  }, []);

  const handleSignout = useCallback(() => {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("userName");
    navigate("/login");
  }, [userId]);

  return (
    <div className="shadow-xl bg-[#e9d5ff] p-6 flex flex-row items-center justify-between">
      <h1 className="sm:text-3xl text-2xl text-[#c002c0] font-semibold">
        Movie Review
      </h1>
      <div className="flex flex-row items-center gap-4">
        <ul className="flex flex-row gap-4 items-center whitespace-nowrap">
          {!userId && (
            <>
              <NavLink to="/login">
                <Button
                  variant="outlined"
                  size="medium"
                  fullWidth
                  color="primary"
                >
                  Login
                </Button>
              </NavLink>
              <NavLink to="/signup">
                <Button
                  variant="contained"
                  size="medium"
                  fullWidth
                  color="primary"
                >
                  Sign up
                </Button>
              </NavLink>
            </>
          )}
          {userId && minScreenSize && (
            <Button
              variant="contained"
              size="medium"
              fullWidth
              color="primary"
              onClick={handleSignout}
            >
              Sign out
            </Button>
          )}
        </ul>
        {userId && (
          <>
            <Avatar
              sx={{ bgcolor: "#c002c0" }}
              className="!text-[#e9d5ff] cursor-pointer"
              onClick={handleOpenActionButtons}
            >
              {userName.slice(0, 1)}
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
              <div className="flex flex-col gap-2 justify-center items-center">
                <h1 className="font-semibold">{userName}</h1>
                <Button
                  className=""
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleSignout();
                    setOpenActiionButtons(false);
                  }}
                >
                  Sign out
                </Button>
              </div>
            </Popover>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
