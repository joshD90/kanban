import { Request, Response } from "express";

import { asyncConn } from "../../db";
import { getSingleBoard } from "../../queries/boardQueries";

//get a single board and any attached stories
export const boardGetSingleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  //need to do a check whether the user id matches our req.user.id and to see whether the board id matches boards belonging to user
  //can't search a board without an id
  if (!req.params.boardId)
    return res.status(400).json("No boards id to search");
  const connection = await asyncConn();
  try {
    const [rows] = await connection.query(getSingleBoard, [req.params.boardId]);
    console.log(rows);
    //if none can be found
    if (!rows) throw Error("Could not fetch any boards matching this id");
    //parse the stories section of our data as this has been stringified
    const arrayedStories = JSON.parse(`[${rows[0]?.stories}]`);
    console.log(arrayedStories, "arrayed stories");
    const parsedBoard = { ...rows[0], stories: arrayedStories };

    return res.status(200).json(parsedBoard);
  } catch (error) {
    //type checking our error
    console.log(error);
    if (error instanceof Error) return res.status(500).json(error.message);
    //needs to return a response
    return res.status(500).json(error);
  }
};
