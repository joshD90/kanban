import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";

const projects = ["project 1", "project 2", "project 3"];

const Sidebar = () => {
  return (
    <div className="w-80 h-screen bg-stone-200 relative">
      <div className="w-full bg-white flex items-center p-2 gap-5">
        <div className="flex items-center justify-center rounded-full bg-blue-500 text-bold text-white w-10 h-10">
          J
        </div>
        <p>Joshua Dancey</p>
      </div>
      <div className="w-full bg-stone-500 flex items-center p-2 text-stone-50 gap-5 border-bg-stone-50">
        <Link to="/projects/create">
          <button className="text-bold">
            Create New Project <AddIcon />
          </button>
        </Link>
      </div>
      <div>
        <div className="w-full bg-stone-400 flex items-center p-2 text-stone-50 gap-5">
          <p>Existing Projects</p>
        </div>
        <div className="flex flex-col items-start">
          {projects?.map((project, index) => (
            <div
              className="h-10 text-stone-700 hover:bg-stone-100 p-2 w-full cursor-pointer"
              key={index}
            >
              {project}
            </div>
          ))}
        </div>
        <div className="flex absolute bottom-0 w-full bg-stone-500 w-full justify-end text-stone-50 items-center p-2">
          <button className="flex w-full justify-between">
            Logout <LogoutIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;