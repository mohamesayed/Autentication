import React from "react";
import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h3" color="error">
        404 - Page Not Found 😕
      </Typography>
      <Typography variant="body1">
        It looks like you're lost. You can go back to the{" "}
        <Link to="/">Home Page</Link>.
      </Typography>
    </Container>
  );
};

export default NotFound;
