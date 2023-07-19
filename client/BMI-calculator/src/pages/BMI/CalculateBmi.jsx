import React, { useEffect, useState } from "react";
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
import Navbar from "../../components/Navbar";
import BmiTable from "./BmiTable";

const CalculateBMI = () => {
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);
 const [bmidata,setBmiData]=useState([]);
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
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

    if (!formData.weight) {
      valid = false;
      errors.weight = "Weight is required";
    } 
    if (!formData.height) {
      valid = false;
      errors.height = "height is required";
    } 

    if (!valid) {
      setSignupError(errors);
    }

    return valid;
  };

  const getBmiData=async()=>{
    try {
      const res=await axios.get('http://localhost:8080/v1/bmi')
      setBmiData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getBmiData();
  },[])


   const [userId, setUserId] = useState(null);

   let parseddata = JSON.parse(sessionStorage.getItem("user"));
   useEffect(() => {
     if (parseddata) {
       setUserId(parseddata.userId);
     }
   }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSignupError({});
    setLoading(true);

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:8080/v1/bmi", {
          userId: userId,
          ...formData,
        });

        setLoading(false);

        // Display a success toast notification
        toast.success("BMI Calculated successfully!", { autoClose: 3000 });
        getBmiData();
        // Perform any additional actions, such as redirecting to a login page
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



  return (
    <>
      <Navbar />

      <Container maxWidth="xs">
        <Box marginTop={5}
          display="flex"
          flexDirection="column"
         
         
        >
          <Typography variant="h4" align="center" gutterBottom>
            BMI Calculator
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Weight"
                  type="number"
                  variant="outlined"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  error={Boolean(signupError.weight)}
                  helperText={signupError.weight}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Height"
                  variant="outlined"
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  error={Boolean(signupError.height)}
                  helperText={signupError.height}
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
                    "Get BMI"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
      <BmiTable bmidata={bmidata} />
    </>
  );
};

export default CalculateBMI;
