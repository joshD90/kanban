import { Edit } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useDrag } from "react-dnd";

import { Story } from "../pages/SingleBoard";

type Props = {
  story: Story;
  setVis: React.Dispatch<React.SetStateAction<any>> | undefined;
  setEditStory: React.Dispatch<React.SetStateAction<any>>;
};

const PanelStory: React.FC<Props> = ({ story, setVis, setEditStory }) => {
  //set up our DND to drag stories
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "story",
    item: { id: story.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="w-full border-stone-300 border-2 p-2 rounded-md hover:bg-stone-100 cursor-pointer"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex w-full justify-between items-start">
        <h2>{story?.title}</h2>
        <div
          className="w-8 h-8 rounded-full text-stone-400 hover:text-blue-400 flex items-center justify-center -mt-2 -mr-2"
          onClick={() => {
            setVis && setVis(true);
            setEditStory(story);
          }}
        >
          <Edit style={{ fontSize: "1.3rem" }} />
        </div>
      </div>

      <p className="text-stone-600">{story?.description}</p>
    </div>
  );
};

export default PanelStory;
