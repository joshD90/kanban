import { Request, Response } from "express";

import { promisePool } from "../../db";
import {
  updateStoryPanel,
  updateStoryContent,
} from "../../queries/storyQueries";
//updating our story rows
const updateStoryController = async (req: Request, res: Response) => {
  const connection = promisePool;

  //these will change depending on what manner of update we're looking at
  let preparedStatement: string;
  let values: Array<string | number>;

  //if just updating the panel status use one prepared statement else use the full update as cannot set a prepared statement with dynamic field values
  if (Object.keys(req.body.storyDetails).length < 2) {
    preparedStatement = updateStoryPanel;
    values = [req.body.storyDetails.status_panel, req.body.id];
  } else {
    preparedStatement = updateStoryContent;
    values = [
      req.body.storyDetails.title,
      req.body.storyDetails.description,
      req.body.id,
    ];
  }

  try {
    const [row] = await connection.query(preparedStatement, values);
    if (!row || row.length === 0)
      throw Error("Could not retrieve the updated Story");
    res.status(204).json(row);
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json("Something went wrong with updating story");
    console.log(error);
  }
};
export default updateStoryController;
