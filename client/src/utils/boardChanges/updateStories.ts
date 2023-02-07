import React from "react";
import { StoryDetails } from "../../components/CreateStory";
import { Story } from "../../pages/SingleBoard";
import { Board } from "../../pages/SingleBoard";

const updateStories = (
  setBoard: React.Dispatch<React.SetStateAction<any>>,
  editStory: Story,
  storyDetails: StoryDetails
) => {
  //update our board
  setBoard((prev: Board) => {
    //we need to check if stories are undefined // or empty to satisfy our typescript
    let updatedStories: Story[] | [];
    //it is possible that stories haven;t been defined yet so we can't spread an array that's not there, just set one element of array
    if (prev.stories?.length === 0 || prev.stories === undefined) {
      updatedStories = [{ id: editStory.id, ...storyDetails }];
    } else {
      //remove our previous story from state
      const filteredStories = prev.stories.filter(
        (story) => story.id !== editStory.id
      );
      //add our story back in with rest of existing stories
      updatedStories = [
        ...filteredStories,
        { id: editStory.id, ...storyDetails },
      ];
    }
    return { ...prev, stories: updatedStories };
  });
};

export default updateStories;
