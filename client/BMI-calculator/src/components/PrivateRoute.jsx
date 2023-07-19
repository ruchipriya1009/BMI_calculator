import React from "react";


import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function PrivateRoute({ children }) {
  const isAuth = sessionStorage.getItem("user");

  console.log(isAuth, "local");

  if (!isAuth) {
     toast.error("Please login first", {
       autoClose: 3000,
     });
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
