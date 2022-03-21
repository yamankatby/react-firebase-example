import { Outlet, Navigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Box,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useIsLoggedIn, useCurrentUser } from "../config/hooks";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/authSlice";

export default function Layout() {
  const currentUser = useCurrentUser();
  const isLoggedIn = useIsLoggedIn();

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [confirmSignOutDialogOpen, setConfirmSignOutDialogOpen] =
    useState(false);

  if (isLoggedIn === null) return <h1>Loading...</h1>;
  else if (isLoggedIn === false) return <Navigate replace to="/sign-in" />;

  return (
    <>
      <AppBar position="apsolute">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <IconButton
            color="inherit"
            size="large"
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          >
            <AccountCircleIcon />
          </IconButton>

          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setProfileDialogOpen(true);
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setConfirmSignOutDialogOpen(true);
              }}
            >
              Sign out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Dialog
        open={profileDialogOpen}
        onClose={() => {
          setProfileDialogOpen(false);
        }}
      >
        <DialogTitle>Profile</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" alignItems="center">
            <Avatar />
            <Box ml={3}>
              <Typography>{currentUser?.displayName}</Typography>
              <Typography>{currentUser?.email}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setProfileDialogOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmSignOutDialogOpen}
        onClose={() => {
          setConfirmSignOutDialogOpen(false);
        }}
      >
        <DialogContent>
          <DialogContentText>
            Sign out from "{currentUser?.email}"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setConfirmSignOutDialogOpen(false);
              dispatch(logOut());
            }}
          >
            Sign out
          </Button>
          <Button
            onClick={() => {
              setConfirmSignOutDialogOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Outlet />
    </>
  );
}
