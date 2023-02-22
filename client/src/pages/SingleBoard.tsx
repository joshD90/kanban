import { useParams, useNavigate } from "react-router-dom";
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
  board_id: number;
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
  const navigate = useNavigate();

  const [createStoryVis, setCreateStoryVis] = useState(false);
  const [editStory, setEditStory] = useState<Story | null>(null);
  const [board, setBoard] = useState<Board | null>(null);
  //get our board and all related stories
  useEffect(() => {
    if (!Auth?.id || !boardId) return;
    const boardIdInt = parseInt(boardId);

    fetchSingleBoard(Auth.id, boardIdInt, setBoard, navigate);
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
            <Panel
              setVis={setCreateStoryVis}
              board={board}
              panel={1}
              setBoard={setBoard}
              setEditStory={setEditStory}
            />
            <Panel
              board={board}
              setBoard={setBoard}
              panel={2}
              setVis={setCreateStoryVis}
              setEditStory={setEditStory}
            />
            <Panel
              board={board}
              panel={3}
              setBoard={setBoard}
              setVis={setCreateStoryVis}
              setEditStory={setEditStory}
            />
          </>
        )}
      </div>
      {createStoryVis && boardId && (
        <CreateStory
          setVis={setCreateStoryVis}
          setBoard={setBoard}
          board_id={parseInt(boardId)}
          editStory={editStory}
          setEditStory={setEditStory}
        />
      )}
    </div>
  );
};

export default SingleBoard;
