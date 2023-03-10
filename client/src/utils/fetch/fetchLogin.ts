import React from "react";
import { UserState } from "../../context/authContext";

export const fetchLogin = async (
  loginDetails: { email: string; password: string },
  userObj: UserState,
  setError: React.Dispatch<React.SetStateAction<any>>
): Promise<any> => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  try {
    //make our request
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDetails),
      credentials: "include",
    });
    if (!response.ok)
      throw new Error("Login Failure with Status Code of " + response.status);

    const returnedUser = await response.json();
    //update our context - setUser can be null at the very outself of setting context so check first
    if (!userObj.setUser) throw Error("There is no user context set up yet");
    //we update our AuthContext through set state, this updates the user
    userObj.setUser({ ...returnedUser, isLoggedIn: true });
    //this function returns true so that the login function knows to navigate to the homepage
    return true;
  } catch (error) {
    //would like to make some kind of error handling, need to pass a setError to this
    if (error instanceof Error) setError(error.message);
    return false;
  }
};
