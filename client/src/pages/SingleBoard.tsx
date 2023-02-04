import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import CreateStory from "../components/CreateStory";
import Panel from "../components/Panel";
import { fetchSingleBoard } from "../utils/fetch/fetchSingleBoard";
import { AuthContext } from "../context/authContext";

export type Story = {
  id: number;
  title: string;
  description: string;
  status_panel: number;
};

export type Board = {
  id: number;
  name: string;
  panel1: string;
  panel2: string;
  panel3: string;
  stories?: Story[] | [];
};

const SingleBoard = () => {
  const { boardId } = useParams();
  const Auth = useContext(AuthContext);

  const [createStoryVis, setCreateStoryVis] = useState(false);
  const [board, setBoard] = useState<Board | null>(null);
  //get our board and all related stories
  useEffect(() => {
    if (!Auth?.id || !boardId) return;
    const boardIdInt = parseInt(boardId);
    fetchSingleBoard(Auth.id, boardIdInt, setBoard);
  }, [boardId]);

  return (
    <div className="w-full h-screen flex items-center justify-start flex-col p-5 bg-stone-100 overflow-y-scroll relative">
      <h1 className="text-xl pb-5">{board?.name}</h1>
      <div
        className={`w-full min-h-content flex gap-5 bg-stone-300 p-5 flex-col md:flex-row ${
          createStoryVis && "blur-sm brightness-90"
        }`}
      >
        {board && (
          <>
            <Panel setVis={setCreateStoryVis} board={board} panel={1} />
            <Panel board={board} panel={2} />
            <Panel board={board} panel={3} />
          </>
        )}
      </div>
      {createStoryVis && boardId && (
        <CreateStory setVis={setCreateStoryVis} board_id={parseInt(boardId)} />
      )}
    </div>
  );
};

export default SingleBoard;
