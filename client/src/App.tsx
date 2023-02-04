import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateProject from "./pages/CreateProject";
import SingleBoard from "./pages/SingleBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/boards/create" element={<CreateProject />} />
          <Route
            path="/boards/:boardId"
            element={
              <DndProvider backend={HTML5Backend}>
                <SingleBoard />
              </DndProvider>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
