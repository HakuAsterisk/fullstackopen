import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../stores/user-store";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginForm = () => {
  const navigate = useNavigate();
  const login = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async (event) => {
    event.preventDefault();
    const success = await login(username, password);
    setUsername("");
    setPassword("");
    if (success) {
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>

        <Box component="form" onSubmit={logIn} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
