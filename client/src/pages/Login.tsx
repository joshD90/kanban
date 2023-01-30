import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import { fetchLogin } from "../utils/fetch/fetchLogin";

const Login = () => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  //do a controlled update of our states
  const changeLoginDetails = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  //do our login functionality
  const doLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (loginDetails.email === "" || loginDetails.password === "")
      return setError("You need to enter both Email and Password");
    //user is updated in our fetchlogin function but we get the returned boolean to see whether
    //we should redirect on its completion
    const outcome = await fetchLogin(loginDetails, user);
    //clear our state of sensitive data
    setLoginDetails({ email: "", password: "" });
    if (outcome) navigate("/");
    //if (!outcome)setError() - need to implement this or could do this within our fetchlogin function
  };

  //reset error message
  useEffect(() => {
    const errorTimer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(errorTimer);
  }, [error]);

  return (
    <div className="w-full h-screen bg-stone-800 flex items-center justify-center p-2">
      {error !== "" && (
        <div className="w-full absolute h-8 bg-red-700 top-0 text-stone-50 flex items-center justify-center">
          {error}
        </div>
      )}
      <div className="w-full max-w-md sm:w-2/3 md:w-1/2 lg:1/3 border-2 border-stone-50 h-1/3 min-h-96 bg-stone-500 rounded-md">
        <form
          onSubmit={doLogin}
          className="flex flex-col w-full h-full items-start justify-around p-5"
        >
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-stone-700">
              email
            </label>
            <input
              onChange={changeLoginDetails}
              type="email"
              id="email"
              placeholder="The email you used to sign up"
              className="p-1 border-none rounded-sm w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-stone-700">password</label>
            <input
              onChange={changeLoginDetails}
              type="password"
              id="password"
              placeholder="Your Password Here"
              className="p-1 border-none rounded-sm w-full"
            />
          </div>
          <button
            type="submit"
            className="self-center bg-lime-700 p-2 rounded-md font-bold text-stone-50 hover:bg-lime-600 mt-3 w-full mt-5"
          >
            Login
          </button>
        </form>
        <div className="text-stone-50 mt-5 flex flex-col items-center">
          <p>Don't have an account?</p>
          <Link to="/signup">
            <button className="bg-lime-800 p-2 rounded-md font-bold pt-2 opacity-70 hover:opacity-100">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
