// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Paper,
//   OutlinedInput,
//   InputLabel,
//   FormControl,
//   Button,
//   IconButton,
//   InputAdornment,
//   Typography,
//   Switch,
//   Snackbar,
//   Alert,
//   CircularProgress,
//   FormControlLabel,
//   createTheme,
//   ThemeProvider,
// } from "@mui/material";
// import {
//   Google,
//   GitHub,
//   Facebook,
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";
// import { createClient } from "@supabase/supabase-js";
// import { useNavigate } from "react-router-dom"; // Make sure to install react-router-dom

// // Initialize Supabase client
// const supabaseUrl = "https://mjrjaxcyyclecsiwyupa.supabase.co";
// const supabaseAnonKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qcmpheGN5eWNsZWNzaXd5dXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNDkxNTQsImV4cCI6MjA1NzYyNTE1NH0.LbdcjIor0y0ykc-fjozpS82TS3ulosFMnpAuOeFe59s";
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [darkMode, setDarkMode] = useState(
//     () => localStorage.getItem("theme") === "dark"
//   );
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const navigate = useNavigate(); // Hook for navigation

//   useEffect(() => {
//     localStorage.setItem("theme", darkMode ? "dark" : "light");
//   }, [darkMode]);

//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: {
//         main: darkMode ? "#1976d2" : "#1976d2",
//         light: darkMode ? "#63ccff" : "#63ccff",
//         dark: darkMode ? "#004ba0" : "#004ba0",
//       },
//       secondary: {
//         main: darkMode ? "#ff8a80" : "#ef5350",
//         light: darkMode ? "#ffb3ae" : "#ffcdd2",
//         dark: darkMode ? "#da4f43" : "#b61827",
//       },
//       background: {
//         default: darkMode ? "#121212" : "#f5f5f5",
//         paper: darkMode ? "#1e1e1e" : "#ffffff",
//       },
//       text: {
//         primary: darkMode ? "#ffffff" : "#000000",
//         secondary: darkMode ? "#b3ffffff" : "#757575",
//         disabled: darkMode ? "#ffffff66" : "#424242",
//       },
//       error: {
//         main: darkMode ? "#ff5252" : "#d32f2f",
//         light: darkMode ? "#ffcdd2" : "#ef5350",
//         dark: darkMode ? "#c62828" : "#b71c1c",
//       },
//       success: {
//         main: darkMode ? "#66bb6a" : "#43a047",
//         light: darkMode ? "#a5d6a7" : "#66bb6a",
//         dark: darkMode ? "#388e3c" : "#2e7d32",
//       },
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (!formData.email || !formData.password)
//         throw new Error("Please fill in all required fields");
//       if (!isLogin && formData.password !== formData.confirmPassword)
//         throw new Error("Passwords do not match");

//       if (isLogin) {
//         // Login with email and password
//         const { user, error } = await supabase.auth.signIn({
//           email: formData.email,
//           password: formData.password,
//         });

//         if (error) throw error;

//         // Redirect to content page after successful login
//         navigate("/content"); // Adjust the route as needed
//       } else {
//         // Sign up with email and password
//         const { user, error } = await supabase.auth.signUp({
//           email: formData.email,
//           password: formData.password,
//         });

//         if (error) throw error;

//         // Redirect to content page after successful sign up
//         navigate("/content"); // Adjust the route as needed
//       }

//       setSnackbar({
//         open: true,
//         message: isLogin
//           ? "Login successful!"
//           : "Account created successfully!",
//         severity: "success",
//       });

//       setFormData({ email: "", password: "", confirmPassword: "" });
//     } catch (error) {
//       setSnackbar({ open: true, message: error.message, severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     const { user, error } = await supabase.auth.signIn({
//       provider: "google",
//     });

//     if (error) {
//       setSnackbar({ open: true, message: error.message, severity: "error" });
//     } else {
//       // Redirect to content page after successful login
//       navigate("/content"); // Adjust the route as needed
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           minHeight: "100vh",
//           bgcolor: darkMode ? "#000000" : theme.palette.background.default,
//           transition: "all 0.3s ease",
//           margin: 0, // Remove unwanted margins
//           padding: 0, // Remove unwanted padding
//         }}
//       >
//         <Container maxWidth="sm" sx={{ padding: 0 }}>
//           <Box sx={{ pt: 8, pb: 6 }}>
//             <Paper
//               elevation={3}
//               sx={{
//                 padding: 3,
//                 borderRadius: 2,
//                 bgcolor: theme.palette.background.paper,
//                 color: theme.palette.text.primary,
//               }}
//             >
//               <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       checked={darkMode}
//                       onChange={() => setDarkMode(!darkMode)}
//                     />
//                   }
//                   label={darkMode ? "Light Mode" : "Dark Mode"}
//                   sx={{
//                     color: darkMode ? "#ffffff" : "#000000",
//                     "& .MuiSwitch-track": {
//                       bgcolor: darkMode
//                         ? "rgba(255,255,255,0.3)"
//                         : "rgba(0,0,0,0.3)",
//                     },
//                     "& .MuiSwitch-switchBase.Mui-checked": {
//                       "&:hover": {
//                         bgcolor: darkMode
//                           ? "rgba(255,255,255,0.2)"
//                           : "rgba(0,0,0,0.2)",
//                       },
//                     },
//                   }}
//                 />
//               </Box>

//               <Typography
//                 variant="h4"
//                 align="center"
//                 gutterBottom
//                 sx={{
//                   color: theme.palette.text.primary,
//                   fontWeight: 500,
//                 }}
//               >
//                 {isLogin ? "Welcome Back" : "Create Account"}
//               </Typography>

//               <Grid container spacing={2}>
//                 {/* Social buttons */}
//                 <Grid item xs={12}>
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     startIcon={<Google />}
//                     onClick={handleGoogleSignIn} // Handle Google sign-in
//                     sx={{
//                       bgcolor: "#DB4437",
//                       "&:hover": { bgcolor: "#C53929" },
//                       mb: 1,
//                     }}
//                   >
//                     Continue with Google
//                   </Button>

//                   <Button
//                     fullWidth
//                     variant="contained"
//                     startIcon={<GitHub />}
//                     sx={{
//                       bgcolor: "#333",
//                       "&:hover": {
//                         bgcolor: "#000",
//                       },
//                       mt: 1,
//                       mb: 1,
//                     }}
//                   >
//                     Continue with GitHub
//                   </Button>

//                   <Button
//                     fullWidth
//                     variant="contained"
//                     startIcon={<Facebook />}
//                     sx={{
//                       bgcolor: "#4267B2",
//                       "&:hover": { bgcolor: "#365899" },
//                       mt: 1,
//                     }}
//                   >
//                     Continue with Facebook
//                   </Button>
//                 </Grid>

//                 {/* Form fields */}
//                 <Grid item xs={12}>
//                   <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
//                     <InputLabel htmlFor="email">Email</InputLabel>
//                     <OutlinedInput
//                       id="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                       }
//                       label="Email"
//                       required
//                     />
//                   </FormControl>

//                   <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
//                     <InputLabel htmlFor="password">Password</InputLabel>
//                     <OutlinedInput
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       value={formData.password}
//                       onChange={(e) =>
//                         setFormData({ ...formData, password: e.target.value })
//                       }
//                       label="Password"
//                       endAdornment={
//                         <InputAdornment position="end">
//                           <IconButton
//                             onClick={() => setShowPassword(!showPassword)}
//                           >
//                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                           </IconButton>
//                         </InputAdornment>
//                       }
//                       required
//                     />
//                   </FormControl>

//                   {!isLogin && (
//                     <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
//                       <InputLabel htmlFor="confirm-password">
//                         Confirm Password
//                       </InputLabel>
//                       <OutlinedInput
//                         id="confirm-password"
//                         type={showConfirmPassword ? "text" : "password"}
//                         value={formData.confirmPassword}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             confirmPassword: e.target.value,
//                           })
//                         }
//                         label="Confirm Password"
//                         endAdornment={
//                           <InputAdornment position="end">
//                             <IconButton
//                               onClick={() =>
//                                 setShowConfirmPassword(!showConfirmPassword)
//                               }
//                             >
//                               {showConfirmPassword ? (
//                                 <VisibilityOff />
//                               ) : (
//                                 <Visibility />
//                               )}
//                             </IconButton>
//                           </InputAdornment>
//                         }
//                         required
//                       />
//                     </FormControl>
//                   )}
//                 </Grid>

//                 {/* Submit button */}
//                 <Grid item xs={12}>
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     color="primary"
//                     onClick={handleSubmit}
//                     disabled={loading}
//                     sx={{
//                       py: 1.5,
//                       bgcolor: darkMode ? "#1976d2" : "#1976d2",
//                       "&:hover": {
//                         bgcolor: darkMode ? "#115293" : "#115293",
//                       },
//                     }}
//                   >
//                     {loading ? (
//                       <CircularProgress size={24} color="inherit" />
//                     ) : isLogin ? (
//                       "Login"
//                     ) : (
//                       "Sign Up"
//                     )}
//                   </Button>
//                 </Grid>

//                 {/* Toggle text */}
//                 <Grid item xs={12}>
//                   <Typography align="center">
//                     {isLogin
//                       ? "Don't have an account? "
//                       : "Already have an account? "}
//                     <Button
//                       onClick={() => setIsLogin(!isLogin)}
//                       sx={{
//                         p: 0,
//                         minHeight: 0,
//                         color: darkMode ? "#ffffff" : "#000000",
//                         "&:hover": {
//                           textDecoration: "underline",
//                           bgcolor: "transparent",
//                         },
//                       }}
//                     >
//                       {isLogin ? "Sign Up" : "Login"}
//                     </Button>
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Paper>
//           </Box>
//         </Container>

//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           <Alert severity={snackbar.severity} variant="filled">
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default AuthPage;








import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import NotFound from "./components/NotFound";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import { auth } from "./components/firebaseAuth";

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
