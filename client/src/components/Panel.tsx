import AddIcon from "@mui/icons-material/Add";
import { useDrop } from "react-dnd";

import PanelStory from "./PanelStory";
import { Story, Board } from "../pages/SingleBoard";

type Props = {
  setVis?: React.Dispatch<React.SetStateAction<any>>;
  board: Board;
  panel: number;
};

const Panel: React.FC<Props> = ({ setVis, board, panel }) => {
  //set this component up to accept dropped components
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "story",
    drop: () => {
      console.log(panel, "PANEL accessing");
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      dropResult: monitor.getDropResult(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="w-full h-1/3 md:w-1/3 bg-stone-200 h-full pb-5 mb-5"
    >
      <h1 className="w-full flex items-center justify-center bg-stone-500 text-stone-50 p-2 font-bold text-xl">
        {panel === 1 && board.panel1}
        {panel === 2 && board.panel2}
        {panel === 3 && board.panel3}
      </h1>
      <div>
        <div className="h-full bg-stone-50 flex flex-row md:flex-col p-5 gap-2 flex-wrap">
          {board.stories?.map((story: Story) => {
            if (!story) return;
            if (story?.status_panel !== panel) return;
            return <PanelStory story={story} key={story.id} />;
          })}
        </div>
      </div>
      {setVis && (
        <div className="items-self-end w-full h-10 relative flex justify-end p-1">
          <div
            className="h-10 w-10 rounded-full bg-blue-500 text-stone-50 flex items-center justify-center cursor-pointer hover:bg-blue-400"
            onClick={() => setVis(true)}
          >
            <AddIcon className="text-4xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Panel;
