import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

  
    if (!formData.email) {
      valid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      valid = false;
      errors.email = "Invalid email format";
    }
    if (!formData.password) {
      valid = false;
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      valid = false;
      errors.password = "Password must be at least 6 characters";
    }

    if (!valid) {
      setSignupError(errors);
    }

    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSignupError({});
    setLoading(true);

    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://beautiful-poncho-lamb.cyclic.app/v1/login",
          formData
        );

        setLoading(false);

        // Display a success toast notification
        toast.success("Login successful!", { autoClose: 3000 });
        const userdata={
            token:response?.data.token,
            name:response?.data.name,
            email:response?.data.email,
            userId:response?.data.userId,
        }
        sessionStorage.setItem("user",JSON.stringify(userdata));
       
       
        Navigate('/calculate-bmi')
       
      } catch (error) {
        setLoading(false);
        console.log(error);
        // Display an error toast notification
        toast.error(` ${error.response.data.error}`, {
          autoClose: 3000,
        });
      }
    } else {
      setLoading(false);
    }
  };
const Navigate=useNavigate()
  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(signupError.email)}
                helperText={signupError.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(signupError.password)}
                helperText={signupError.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography
          style={{
            marginTop: 20,
            fontSize: "14px",
            color: "gray",
            fontStyle: "italic",
            textAlign: "center",
          }}
          variant="body2"
          align="center"
          gutterBottom
        >
          Don't have an account? <Link to="/signup">Sign up first</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
