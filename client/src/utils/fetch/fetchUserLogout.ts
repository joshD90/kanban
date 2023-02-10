import { userInitialState } from "../../context/authContext";

export const fetchUserLogout = async (
  setUser: React.Dispatch<React.SetStateAction<any>> | null
) => {
  if (!setUser) return;
  const url = `${import.meta.env.VITE_BASE_URL}/auth/logout`;
  try {
    const response = await fetch(url, { credentials: "include" });
    if (response.ok) {
      setUser(userInitialState);
      location.reload();
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
