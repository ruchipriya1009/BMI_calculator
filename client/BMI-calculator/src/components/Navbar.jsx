import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    const username=sessionStorage.getItem('user')
    let parsedUser=JSON.parse(username)

      const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Welcome,{" "}
          <span style={{ fontWeight: "bold" }}>
            {" "}
            {capitalizeFirstLetter(parsedUser.name)}
          </span>
        </Typography>
        <Button color="inherit" component={Link} to="/profile">
          Profile
        </Button>
        <Button color="inherit" component={Link} to="/calculate-bmi">
          BMI Calculator
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
