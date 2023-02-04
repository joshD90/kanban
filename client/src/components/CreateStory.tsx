import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  setVis: React.Dispatch<React.SetStateAction<any>>;
  board_id: number;
};
export type StoryDetails = {
  title?: string;
  description?: string;
  status_panel?: number;
  board_id: number;
};

const CreateStory: React.FC<Props> = ({ setVis, board_id }) => {
  const [storyDetails, setStoryDetails] = useState({
    status_panel: 1,
    board_id: board_id,
  });
  //change our story details dynamically
  const changeDetails = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStoryDetails((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
    console.log(storyDetails);
  };

  return (
    <div className="absolute top-1/2 left-1/2 bg-blue-50 w-96 h-96 -translate-x-2/4 -translate-y-2/4 rounded-md p-5 shadow-md">
      <form className="h-full flex flex-col gap-2 relative">
        <div
          className="w-10 h-10 rounded-full absolute -right-2 -top-2 cursor-pointer flex items-center justify-center"
          onClick={() => setVis(false)}
        >
          <CloseIcon />
        </div>
        <h1 className="text-stone-700 text-lg">Create A New Story</h1>
        <div className="flex flex-col">
          <label className="text-stone-600">Title</label>
          <input
            id="title"
            onChange={changeDetails}
            className="p-1 border-2 border-stone-200 rounded-sm"
          />
        </div>
        <div className="flex flex-grow flex-col  min-h-content p">
          <label className="text-stone-600">Description</label>
          <textarea
            id="description"
            onChange={changeDetails}
            className="resize-none flex-grow p-2 border-2 border-stone-200 rounded-sm"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default CreateStory;
