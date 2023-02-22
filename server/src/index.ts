import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//import passport configuration
import { configurePassport } from "./utils/passport-strategies";
//import our routes
import authRoutes from "./routes/authRoutes";
import boardRoutes from "./routes/boardRoutes";
import storyRoutes from "./routes/storyRoutes";

//set up express
const app = express();

//set up cors - credentials true allows up to pass cookies data
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//and express middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configurePassport(app);

//router middleware
app.use("/auth", authRoutes);
app.use("/boards", boardRoutes);
app.use("/stories", storyRoutes);

app.listen(6000, () => {
  console.log("server is listening on port 6000");
});
