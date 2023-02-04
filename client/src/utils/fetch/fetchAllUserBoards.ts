import React from "react";
import { User } from "../../context/authContext";

export type Board = {
  id: number;
  name: string;
  panel1: string;
  panel2: string;
  panel3: string;
};

const fetchAllUserBoards = async (
  user: User,
  setBoards?: React.Dispatch<React.SetStateAction<Board[]>>,
  setError?: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  try {
    //fetch our board data associated with the user id
    const url = `${import.meta.env.VITE_BASE_URL}/boards/${user.id}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    //set our state
    setBoards && setBoards(data);
  } catch (error) {
    console.log(error);
    if (error instanceof Error && setError) setError(error.message);
  }
};

export default fetchAllUserBoards;
