import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import Navbar from "../../components/Navbar";

const Profile = () => {
 
 
  const [profileData,setProfile]=useState(null)

  let parseddata= JSON.parse(sessionStorage.getItem('user'))
  useEffect(()=>{
    if(parseddata){
      setProfile(parseddata)
    }
  },[])




 
  return (
    <>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
        bgcolor="background.paper"
        p={3}
        borderRadius="borderRadius"
        boxShadow={3}
    
        
      >
        <Box textAlign="center">
          <Avatar
            alt="Profile Image"
            src="https://randomuser.me/api/portraits/women/5.jpg"
            sx={{ width: 150, height: 150, margin: "0 auto" }}
          />
          <Typography variant="h5" component="h1" gutterBottom>
            {profileData?.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {profileData?.email}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
