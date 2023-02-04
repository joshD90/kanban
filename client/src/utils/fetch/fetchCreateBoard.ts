import { Board } from "../../pages/CreateProject";

export const fetchCreateBoard = async (details: Board): Promise<void> => {
  const url = `${import.meta.env.VITE_BASE_URL}/boards/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(details),
    });

    if (response.status !== 201) throw Error(response.statusText);
    const data = await response.json();
  } catch (error) {
    console.log(error);
    if (error instanceof Error) console.log(error.message);
  }
};
