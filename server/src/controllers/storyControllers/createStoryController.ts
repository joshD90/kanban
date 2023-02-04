import { Request, Response } from "express";

import { asyncConn } from "../../db";
import { createStoryTable, addStory } from "../../queries/storyQueries";
export const createStoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const connection = await asyncConn();
  console.log(req.body.description);
  //create our story table intially
  try {
    const newTable = await connection.query(createStoryTable);
    console.log("new story table was created successfully");
    if (!newTable)
      return res.status(500).json("Could not create a new story Table");
  } catch (error) {
    console.log(error);
    if (error instanceof Error) return res.status(500).json(error.message);
    return res.status(500).json(error);
  }
  //now add our story
  try {
    const [rows] = await connection.query(addStory, [
      req.body.title,
      req.body.description,
      req.body.status_panel,
      req.body.board_id,
    ]);
    console.log(rows, "inserted story");
    if (!rows) throw Error("Could not Create the document");
    return res.status(201).json(rows);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) return res.status(500).json(error.message);
    return res.status(500).json(error);
  }
};
