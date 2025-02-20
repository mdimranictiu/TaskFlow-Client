import React, { useContext } from 'react';
import { Navigate,  } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthProvider';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);


  // Show spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-xl shadow-lg rounded-lg p-8">
         <p>Loading....</p>
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  }


  return <Navigate to="/" />;
};

export default PrivateRoute;
