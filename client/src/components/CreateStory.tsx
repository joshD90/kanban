import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import fetchCreateStory from "../utils/fetch/fetchCreateStory";

import { Story } from "../pages/SingleBoard";
import fetchUpdateStory from "../utils/fetch/fetchUpdateStory";
import { Board } from "../pages/SingleBoard";
import updateStories from "../utils/boardChanges/updateStories";

type Props = {
  setVis: React.Dispatch<React.SetStateAction<any>>;
  setBoard: React.Dispatch<React.SetStateAction<any>>;
  board_id: number;
  editStory: Story | null;
  setEditStory: React.Dispatch<React.SetStateAction<any>>;
};
export type StoryDetails = {
  title: string;
  description: string;
  status_panel: number;
  board_id: number;
};

const CreateStory: React.FC<Props> = ({
  setVis,
  setBoard,
  board_id,
  editStory,
  setEditStory,
}) => {
  //if we are editing we pass in our pre-existing information or if we are creating it will be null
  const [storyDetails, setStoryDetails] = useState({
    title: editStory ? editStory.title : "",
    description: editStory ? editStory.description : "",
    status_panel: editStory ? editStory.status_panel : 1,
    board_id: board_id,
  });
  //change our story details dynamically
  const changeDetails = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStoryDetails((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  //if we are creating a new story
  const createStory = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const shouldClose = await fetchCreateStory(storyDetails, setBoard);

    //hide the form if we get a successful
    if (shouldClose) {
      setVis(false);
    }
  };

  //if we are passing an edit property
  const updateStory = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!editStory) return;
    const success = await fetchUpdateStory(editStory.id, storyDetails);
    if (success) {
      updateStories(setBoard, editStory, storyDetails);
      // {setBoard((prev: Board) => {
      //   //we need to check if stories are undefined // or empty to satisfy our typescript
      //   let updatedStories: Story[] | [];
      //   if (prev.stories?.length === 0 || prev.stories === undefined) {
      //     updatedStories = [{ id: editStory.id, ...storyDetails }];
      //   } else {
      //     const filteredStories = prev.stories.filter(
      //       (story) => story.id !== editStory.id
      //     );
      //     updatedStories = [
      //       ...filteredStories,
      //       { id: editStory.id, ...storyDetails },
      //     ];
      //   }
      //   return { ...prev, stories: updatedStories };
      // });
      setVis(false);
      setEditStory(null);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 bg-blue-50 w-96 h-96 -translate-x-2/4 -translate-y-2/4 rounded-md p-5 shadow-md">
      <form
        onSubmit={editStory ? updateStory : createStory}
        className="h-full flex flex-col gap-2 relative"
      >
        <div
          className="w-10 h-10 rounded-full absolute -right-2 -top-2 cursor-pointer flex items-center justify-center"
          onClick={() => {
            setVis(false);
            setEditStory(null);
          }}
        >
          <CloseIcon />
        </div>
        <h1 className="text-stone-700 text-lg">
          {editStory ? "Edit this Story" : "Create A New Story"}
        </h1>
        <div className="flex flex-col">
          <label className="text-stone-600">Title</label>
          <input
            id="title"
            onChange={changeDetails}
            className="p-1 border-2 border-stone-200 rounded-sm"
            defaultValue={editStory?.title}
          />
        </div>
        <div className="flex flex-grow flex-col  min-h-content p">
          <label className="text-stone-600">Description</label>
          <textarea
            id="description"
            onChange={changeDetails}
            className="resize-none flex-grow p-2 border-2 border-stone-200 rounded-sm"
            defaultValue={editStory?.description}
          ></textarea>
        </div>
        <button
          type="submit"
          className="p-2 bg-lime-600 hover:bg-lime-500 rounded-sm text-stone-800"
        >
          {editStory ? "Edit Story" : "Create Story"}
        </button>
      </form>
    </div>
  );
};

export default CreateStory;
