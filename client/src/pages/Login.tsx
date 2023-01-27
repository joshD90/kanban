import React from "react";

const Login = () => {
  return (
    <div className="w-full h-screen bg-stone-800 flex items-center justify-center">
      <div className="w-1/3 min-w-96 border-2 border-stone-50 h-1/3 min-h-96 bg-stone-500 rounded-md">
        <form className="flex flex-col w-full h-full items-start justify-around p-5">
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-stone-700">
              email
            </label>
            <input
              type="email"
              id="email"
              placeholder="The email you used to sign up"
              className="p-1 border-none rounded-sm w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-stone-700">password</label>
            <input
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
