import { FC } from "react";
import { Board } from "../pages/SingleBoard";
import { useNavigate } from "react-router-dom";

type props = {
  board: Board;
};

const HomeBoards: FC<props> = ({ board }) => {
  const navigate = useNavigate();

  return (
    <div
      className="h-full h-24 w-32 bg-stone-400 hover:bg-stone-300 hover:text-stone-700 justify-center flex items-center cursor-pointer shadow-md rounded-sm transition-all"
      onClick={() => {
        navigate(`/boards/${board.id}`);
      }}
    >
      {board.name}
    </div>
  );
};

export default HomeBoards;
