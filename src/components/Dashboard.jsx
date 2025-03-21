import React from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { auth } from "./firebaseAuth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center", mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard 🎉
        </Typography>
        <Typography variant="body1" gutterBottom>
          You are successfully logged in. You can manage your account or log
          out.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Log Out
        </Button>
      </Paper>
    </Container>
  );
};

export default Dashboard;
