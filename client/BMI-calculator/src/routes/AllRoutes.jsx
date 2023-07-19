import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const CalculateBmi = lazy(() => import("../pages/BMI/CalculateBmi"));
const Profile = lazy(() => import("../pages/BMI/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AllRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading Login...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<div>Loading Signup...</div>}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/calculate-bmi"
          element={
            <PrivateRoute>
              <Suspense fallback={<div>Loading Calculate BMI...</div>}>
                <CalculateBmi />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Suspense fallback={<div>Loading Profile...</div>}>
                <Profile />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
           
              <Suspense fallback={<div>Loading </div>}>
                <NotFound />
              </Suspense>
            
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
