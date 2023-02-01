import React, { useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";

import { AuthContext } from "../context/authContext";
import { checkBoardCreate } from "../utils/checks/checkBoardCreate";
import { fetchCreateBoard } from "../utils/fetch/fetchCreateBoard";

export type Board = {
  name: string;
  headers: object;
  participants: string[];
};

const CreateProject = () => {
  const user = useContext(AuthContext);

  const [participant, setParticipant] = useState("");
  const [header, setHeader] = useState("");
  //we conditionally add the user email as it has type of null as well as string, we do this using spread syntax
  const [boardDetails, setBoardDetails] = useState<Board>({
    name: "",
    headers: {},
    participants: [...(user?.email ? [user?.email] : [])],
  });

  const changeBoardDetails = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBoardDetails((prev) => ({ ...prev, name: e.target.value }));
  };

  const createBoard = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    //check to see whether all fields are filled out first
    const allFilledOut = checkBoardCreate(boardDetails);
    if (allFilledOut !== "true") return console.log(allFilledOut);
    const response = await fetchCreateBoard(boardDetails);
    console.log(response);
  };

  const addHeader = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const numberWords = ["one", "two", "three"];
    const headerNumber =
      numberWords[parseInt(e.target.id.slice(e.target.id.length - 1))];
    setBoardDetails((prev) => ({
      ...prev,
      headers: { ...prev.headers, [headerNumber]: e.target.value },
    }));
  };

  //add our particpants into the details array
  const addParticipant = (): void => {
    //check to see whether the name has already been added
    if (boardDetails.participants.some((name) => name === participant))
      return console.log("Cant add the same person twice");
    setBoardDetails((prev) => ({
      ...prev,
      participants: [...prev.participants, participant],
    }));
    setParticipant("");
  };

  //remove our participant details on click
  const removeParticipant = (e: React.MouseEvent<HTMLSpanElement>): void => {
    setBoardDetails((prev) => {
      return {
        ...prev,
        participants: prev.participants.filter(
          (participant) => participant != (e.target as HTMLSpanElement)?.id
        ),
      };
    });
  };

  return (
    <div className="flex items-center justify-center w-full bg-stone-50 p-5">
      <div className="w-full max-w-md sm:w-2/3 md:w-1/2 lg:1/3">
        <form
          onSubmit={createBoard}
          className="bg-stone-400 flex gap-2 flex-col p-5 rounded-md"
        >
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-stone-700">
              Name
            </label>
            <input
              onChange={changeBoardDetails}
              type="text"
              id="name"
              placeholder="Board / Project Name Here"
              className="p-1 border-none rounded-sm w-full"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="name" className="text-stone-700">
              Section Headers
            </label>
            <input
              onChange={addHeader}
              type="text"
              id="header0"
              placeholder="Panel 1 Header"
              className="p-1 border-none rounded-sm w-full"
            />
            <input
              onChange={addHeader}
              type="text"
              id="header1"
              placeholder="Panel 2 Header"
              className="p-1 border-none rounded-sm w-full"
            />
            <input
              onChange={addHeader}
              type="text"
              id="header2"
              placeholder="Panel 3 Header"
              className="p-1 border-none rounded-sm w-full"
            />
          </div>
          <div>
            <label htmlFor="participant">Participants</label>
            <p className="flex gap-2 text-stone-700 flex-wrap items-center justify-start mb-5">
              {boardDetails.participants.map((participant) => (
                <span
                  onClick={removeParticipant}
                  id={participant}
                  key={participant}
                >
                  {participant}
                </span>
              ))}
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                id="participant"
                placeholder="User's Email"
                className="p-1 border-none rounded-sm w-full"
                onChange={(e) => setParticipant(e.target.value)}
                value={participant}
              />
              <AddIcon onClick={addParticipant} />
            </div>
          </div>
          <button className="bg-lime-500" type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
