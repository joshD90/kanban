import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import Sidebar from "./Sidebar";

//this route protecter will wrap all our other protected routes and have them passed
//through the <Outlet />. Our backend is really the gate keeper to secure information
const ProtectedRoute = () => {
  //get our user from AuthContext
  const auth = useContext(AuthContext);
  //redirect to login page if no user is found
  if (!auth?.isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
