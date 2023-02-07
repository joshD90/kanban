import React, { SetStateAction } from "react";
import { Board } from "../../pages/SingleBoard";

export const fetchDeleteStory = async (
  id: number,
  setBoard: React.Dispatch<SetStateAction<any>>
): Promise<void> => {
  const url = `${import.meta.env.VITE_BASE_URL}/stories/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });
    console.log(response);
    if (!response.ok) throw Error("Could Not Delete");
    setBoard((prev: Board) => ({
      ...prev,
      stories: prev.stories?.filter((story) => story.id !== id),
    }));
  } catch (error) {
    console.log(error);
  }
};
