import { Typography, TextField, Button, Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeEmail, forgotPassword } from "../redux/authSlice";

export default function ForgotPassword() {
  const email = useSelector((state) => state.auth.email);

  const isLoading = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    dispatch(changeEmail(e.currentTarget.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Forgot Password
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Email Address"
        required
        autoComplete="email"
        autoFocus
        value={email}
        onChange={handleEmailChange}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        fullWidth
        sx={{ mt: 2 }}
      >
        {isLoading ? "Loading ..." : "Send Reset Password Email"}
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Link component={RouterLink} to="../sign-in">
          Back to Sign in
        </Link>
      </Box>
    </form>
  );
}
