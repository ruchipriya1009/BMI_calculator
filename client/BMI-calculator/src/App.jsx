import React from 'react'
import AllRoutes from './routes/AllRoutes'
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <AllRoutes />
      <ToastContainer />
    </div>
  );
}

export default App
