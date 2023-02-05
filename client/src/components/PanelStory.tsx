import React, { useEffect } from "react";
import { useDrag } from "react-dnd";

import { Story } from "../pages/SingleBoard";

type Props = {
  story: Story;
};

const PanelStory: React.FC<Props> = ({ story }) => {
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
      <h2>{story?.title}</h2>
      <p className="text-stone-600">{story?.description}</p>
    </div>
  );
};

export default PanelStory;
