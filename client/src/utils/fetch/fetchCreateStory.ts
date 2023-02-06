import React from "react";
import { StoryDetails } from "../../components/CreateStory";
import { Board } from "../../pages/SingleBoard";
//create our story
const fetchCreateStory = async (
  details: StoryDetails,
  setBoard: React.Dispatch<React.SetStateAction<any>>
): Promise<boolean> => {
  const url = `${import.meta.env.VITE_BASE_URL}/stories/`;
  //send off our request / will probably optimistically update our stories later
  //check all through our objects to see whether they are null
  if (
    Object.entries(details).some(([key, value]) => {
      if (value === null || value === undefined) return true;
    })
  )
    //return false from our function if so
    return false;
  try {
    //complete our fetch request
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(details),
    });
    //if no response throw error, this should be caught in our error handler but to be consistent
    if (!response) throw Error("No Created Response was returned from Server");
    const data = await response.json();
    //update our board
    setBoard((prev: Board) => {
      //cater for undefined or no stories in array
      const updatedStories =
        prev.stories === undefined ||
        (prev.stories.length === 0 ? [data[0]] : [...prev.stories, data[0]]);
      //update our state
      return {
        ...prev,
        stories: updatedStories,
      };
    });
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return false;
    }
    console.log(error);
    return false;
  }
};

export default fetchCreateStory;
