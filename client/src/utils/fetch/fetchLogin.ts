import { UserState } from "../../context/authContext";

export const fetchLogin = async (
  loginDetails: { email: string; password: string },
  userObj: UserState
): Promise<any> => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  try {
    //make our request
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDetails),
    });
    const returnedUser = await response.json();
    //update our context - setUser can be null at the very outself of setting context so check first
    if (!userObj.setUser) throw Error("There is no user context set up yet");
    userObj.setUser(returnedUser);
    console.log("THIS IS CALLING INSIDE THE FUNCTION", returnedUser);
    return true;
  } catch (error) {
    //would like to make some kind of error handling, need to pass a setError to this
    console.log(error);
    return false;
  }
};
