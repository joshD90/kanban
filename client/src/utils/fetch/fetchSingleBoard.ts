import React from "react";
import { NavigateFunction } from "react-router-dom";

export const fetchSingleBoard = async (
  userId: number,
  boardId: number,
  setBoard: React.Dispatch<React.SetStateAction<any>>,
  navigate: NavigateFunction
): Promise<void> => {
  const url = `${import.meta.env.VITE_BASE_URL}/boards/${userId}/${boardId}`;
  try {
    //fetch our data
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    console.log(response, "this is the response we should be getting");
    if (!response || !response.ok) throw Error("Could Not Find This Board");
    const data = await response.json();

    setBoard(data);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    navigate("/");
  }
};
