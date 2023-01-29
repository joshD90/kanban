import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import { fetchLogin } from "../utils/fetch/fetchLogin";

const Login = () => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  //do a controlled update of our states
  const changeLoginDetails = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  //do our login functionality
  const doLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    //user is updated in our fetchlogin function but we get the returned boolean to see whether
    //we should redirect on its completion
    const outcome = await fetchLogin(loginDetails, user);
    if (outcome) navigate("/");
    //if (!outcome)setError() - need to implement this or could do this within our fetchlogin function
  };

  return (
    <div className="w-full h-screen bg-stone-800 flex items-center justify-center">
      <div className="w-1/3 min-w-96 border-2 border-stone-50 h-1/3 min-h-96 bg-stone-500 rounded-md">
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
          <button className="bg-lime-800 p-2 rounded-md font-bold pt-2 opacity-70 hover:opacity-100">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
