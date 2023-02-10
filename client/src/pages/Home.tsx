import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

import HomeBoards from "../components/HomeBoards";
import fetchAllUserBoards from "../utils/fetch/fetchAllUserBoards";
import { Board } from "../utils/fetch/fetchAllUserBoards";

const Home = () => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const [projectsDropped, setProjectsDropped] = useState(true);
  const [boards, setBoards] = useState<Board[] | []>([]);

  useEffect(() => {
    fetchAllUserBoards(user, setBoards);
  }, []);

  const dropHide = () => {
    projectsDropped ? setProjectsDropped(false) : setProjectsDropped(true);
  };

  return (
    <div className="w-full h-screen bg-stone-800 text-stone-50 overflow-y-scroll">
      <div className="w-full flex items-center justify-center p-10 flex-col">
        <h2 className="text-stone-50 text-2xl text-center">
          Welcome to Kanban <span className="text-white">Joshua</span>
        </h2>
        <h4 className="text-stone-50 mt-5">What would you like to do today?</h4>
      </div>
      <div className="w-full flex flex-col items-center gap-10">
        <div
          className="w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 h-36 bg-stone-600 shadow-lg cursor-pointer hover:bg-lime-900 rounded-md text-stone-50 flex flex-wrap items-end justify-center p-5"
          onClick={() => {
            navigate("/boards/create");
          }}
        >
          <h4 className="text-3xl w-full text-center mb-0">
            Start a new Project
          </h4>
          <h5 className="text-sm md:text-md text-center mt-0">
            Add Headers / Add Users / Add Stories
          </h5>
        </div>
        <div
          className="w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 h-24 bg-stone-600 hover:bg-blue-900 rounded-md shadow-lg text-stone-50 flex items-center justify-end cursor-pointer flex-col"
          onClick={dropHide}
        >
          <h4 className="text-3xl w-full text-center">View Current Projects</h4>
          <ExpandMoreIcon style={{ fontSize: "2.5rem" }} />
        </div>
        <div
          className={`${
            projectsDropped ? "p-2" : "h-0 p-0 overflow-hidden"
          } bg-none rounded-sm flex gap-2 overflow-hidden transition-all flex-wrap justify-center`}
        >
          {boards.map((board) => (
            <HomeBoards board={board} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
