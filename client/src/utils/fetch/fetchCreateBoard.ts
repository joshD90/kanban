import { Board } from "../../pages/CreateProject";

export const fetchCreateBoard = async (
  details: Board
): Promise<number | boolean> => {
  const url = `${import.meta.env.VITE_BASE_URL}/boards/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(details),
    });

    if (!response.ok) throw Error(response.statusText);
    const data = await response.json();
    //return the newly created board id so we can navigate to it on completion
    return data.board.insertId;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) console.log(error.message);
    return false;
  }
};
