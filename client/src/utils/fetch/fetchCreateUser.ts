import { SignUpDetails } from "../../pages/Signup";

const url = import.meta.env.VITE_BASE_URL;

export const fetchCreateUser = async (
  details: SignUpDetails
): Promise<boolean> => {
  try {
    //send off our response
    const response = await fetch(`${url}/auth/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    });
    //we get the response of 201 if the user has been created return true so that our Login function
    //knows whether to redirect or give an error
    if (response.status === 201) {
      console.log("Successfully created");
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
