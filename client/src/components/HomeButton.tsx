import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

function HomeButton() {
  const navigate = useNavigate();
  return (
    <div
      className="rounded-full w-16 h-16 absolute right-2 top-2 flex items-center justify-center text-stone-400 cursor-pointer hover:text-white"
      onClick={() => navigate("/")}
    >
      <HomeOutlinedIcon style={{ fontSize: "3rem" }} />
    </div>
  );
}

export default HomeButton;
