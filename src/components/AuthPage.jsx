import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  OutlinedInput,
  InputLabel,
  FormControl,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Switch,
  Snackbar,
  Alert,
  CircularProgress,
  FormControlLabel,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  Google,
  Facebook,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { auth, googleProvider, facebookProvider } from "./firebaseAuth";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#1976d2" },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
      text: { primary: darkMode ? "#ffffff" : "#000000" },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.email || !formData.password)
        throw new Error("Please fill in all required fields.");
      if (!isLogin && formData.password !== formData.confirmPassword)
        throw new Error("Passwords do not match.");

      if (isLogin) {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
      } else {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
      }

      setSnackbar({
        open: true,
        message: isLogin
          ? "Login successful!"
          : "Account created successfully!",
        severity: "success",
      });
      setFormData({ email: "", password: "", confirmPassword: "" });
      navigate("/dashboard");
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate("/dashboard");
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: theme.palette.background.default,
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ pt: 8, pb: 6 }}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: 2,
                bgcolor: theme.palette.background.paper,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                    />
                  }
                  label={darkMode ? "Light Mode" : "Dark Mode"}
                />
              </Box>

              <Typography variant="h4" align="center" gutterBottom>
                {isLogin ? "Login" : "Sign Up"}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                startIcon={<Google />}
                onClick={handleGoogleSignIn}
                sx={{
                  bgcolor: "#DB4437",
                  "&:hover": { bgcolor: "#C53929" },
                  mb: 1,
                }}
              >
                Sign in with Google
              </Button>

              <Button
                fullWidth
                variant="contained"
                startIcon={<Facebook />}
                onClick={handleFacebookSignIn}
                sx={{
                  bgcolor: "#4267B2",
                  "&:hover": { bgcolor: "#365899" },
                  mb: 1,
                }}
              >
                Sign in with Facebook
              </Button>

              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  label="Email"
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "transparent",
                    },
                    "&.MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                  }}
                />
              </FormControl>

              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  label="Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              {!isLogin && (
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel>Confirm Password</InputLabel>
                  <OutlinedInput
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    label="Confirm Password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              )}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Sign Up"
                )}
              </Button>

              <Typography align="center" sx={{ mt: 2 }}>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <Button onClick={() => setIsLogin(!isLogin)}>
                  {" "}
                  {isLogin ? "Sign Up" : "Login"}{" "}
                </Button>
              </Typography>
            </Paper>
          </Box>
        </Container>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default AuthPage;
