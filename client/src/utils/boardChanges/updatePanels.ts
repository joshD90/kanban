import React from "react";
import { Board, Story } from "../../pages/SingleBoard";
import fetchUpdateStory from "../fetch/fetchUpdateStory";
//this will update our stories to reflect the new panel that they are part of
export const updatePanels = (
  setBoard: React.Dispatch<React.SetStateAction<any>>,
  panelNum: number,
  storyId: number
): void => {
  //use the previous state and optimistically update this
  setBoard((prev: Board) => {
    //remap the array of  stories held within prev
    const updatedStories = prev.stories?.map((story) => {
      if (story.id === storyId) {
        return { ...story, status_panel: panelNum };
      }
      return story;
    });

    //return the spread prev board with updated stories
    return { ...prev, stories: updatedStories };
  });
  fetchUpdateStory(storyId, { status_panel: panelNum });
};
