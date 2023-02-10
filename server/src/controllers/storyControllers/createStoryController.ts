import { Request, Response } from "express";

import { promisePool } from "../../db";
import { createStoryTable, addStory } from "../../queries/storyQueries";
export const createStoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const connection = promisePool;

  //create our story table intially
  try {
    const newTable = await connection.query(createStoryTable);

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

    if (!rows) throw Error("Could not Create the document");

    const storyRows = await connection.query(
      "SELECT * FROM stories WHERE id = ?",
      [rows.insertId]
    );
    return res.status(201).json(storyRows[0]);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) return res.status(500).json(error.message);
    return res.status(500).json(error);
  }
};
