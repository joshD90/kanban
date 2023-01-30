import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

type Board = {
  name: string;
  headers: object;
  participants: string[];
};

const CreateProject = () => {
  const [participant, setParticipant] = useState("");
  const [header, setHeader] = useState("");
  const [boardDetails, setBoardDetails] = useState<Board>({
    name: "",
    headers: {},
    participants: [],
  });

  const changeBoardDetails = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBoardDetails((prev) => ({ ...prev, name: e.target.value }));
  };
  const createBoard = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log(boardDetails);
  };

  const addHeader = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const headerNumber = e.target.id.slice(
      e.target.id.length - 1,
      e.target.id.length
    );
    setBoardDetails((prev) => ({
      ...prev,
      headers: { ...prev.headers, [headerNumber]: e.target.value },
    }));
  };

  //add our particpants into the details array
  const addParticipant = (): void => {
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
              id="header1"
              placeholder="Panel 1 Header"
              className="p-1 border-none rounded-sm w-full"
            />
            <input
              onChange={addHeader}
              type="text"
              id="header2"
              placeholder="Panel 2 Header"
              className="p-1 border-none rounded-sm w-full"
            />
            <input
              onChange={addHeader}
              type="text"
              id="header3"
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
                type="text"
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