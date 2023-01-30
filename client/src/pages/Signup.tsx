import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

import { fetchCreateUser } from "../utils/fetch/fetchCreateUser";

export type SignUpDetails = {
  email: string;
  fName: string;
  lName: string;
  password: string;
  passwordConfirm: string;
};

const Signup = () => {
  const [details, setDetails] = useState<SignUpDetails>({
    email: "",
    fName: "",
    lName: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    //check to see whether any of the values are empty
    if (Object.values(details).some((value) => value === ""))
      return setError("All Fields Must be Completed");
    if (details.password !== details.passwordConfirm)
      return setError("Passwords need to match");
    //returns a boolean depending on successful response
    const success = await fetchCreateUser(details);
    if (!success) setError("There was an issue with creating your account");
    //if successful redirect to login page
    navigate("/login");
  };

  //change details
  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //reset error message
  useEffect(() => {
    const errorTimer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(errorTimer);
  }, [error]);

  return (
    <div className="w-full h-screen flex flex-col bg-stone-800 items-center justify-center p-2">
      {error !== "" && (
        <div className="w-full absolute h-8 bg-red-700 top-0 text-stone-50 flex items-center justify-center">
          {error}
        </div>
      )}
      <div className="w-full max-w-md sm:w-2/3 md:w-1/2 lg:1/3 border-2 border-stone-50 bg-stone-500 rounded-md">
        <form onSubmit={createAccount} className="flex flex-col gap-2 p-2">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-stone-800">
              Email
              <Tooltip
                placement="right"
                title="This email will be used by others to add you to projects"
              >
                <InfoIcon />
              </Tooltip>
            </label>
            <input
              id="email"
              className="p-1 rounded-sm text-stone-900"
              onChange={handleDetailsChange}
              required
              type="email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="fName" className="text-stone-800">
              First Name
            </label>
            <input
              id="fName"
              className="p-1 rounded-sm text-stone-900"
              onChange={handleDetailsChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lName" className="text-stone-800">
              Last Name
            </label>
            <input
              id="lName"
              className="p-1 rounded-sm text-stone-900"
              onChange={handleDetailsChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-stone-800">Password</label>
            <input
              id="password"
              type="password"
              className="p-1 rounded-sm text-stone-900"
              onChange={handleDetailsChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="passwordConfirm" className="text-stone-800">
              Confirm password
            </label>
            <input
              id="passwordConfirm"
              type="password"
              className="p-1 rounded-sm text-stone-900"
              onChange={handleDetailsChange}
              required
            />
          </div>
          <button className="p-2 text-stone-50 text-bold bg-lime-600 hover:bg-lime-500 mt-5 rounded-sm">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
