import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { login, signUp } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h5" mb={2}>
        Login / Sign Up
      </Typography>

      <TextField
        label="Email"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button fullWidth variant="contained" onClick={handleLogin}>
        Login
      </Button>

      <Button fullWidth sx={{ mt: 1 }} onClick={handleSignUp}>
        Sign Up
      </Button>
    </Box>
  );
};

export default Login;