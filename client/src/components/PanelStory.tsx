import React from "react";
import { Story } from "../pages/SingleBoard";

type Props = {
  story: Story;
};

const PanelStory: React.FC<Props> = ({ story }) => {
  return (
    <div className="w-full border-stone-300 border-2 p-2 rounded-md hover:bg-stone-100 cursor-pointer">
      <h2>{story?.title}</h2>
      <p className="text-stone-600">{story?.description}</p>
    </div>
  );
};

export default PanelStory;
