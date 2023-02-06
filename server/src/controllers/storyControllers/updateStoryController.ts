import { Request, Response } from "express";

import { asyncConn } from "../../db";
import {
  updateStoryPanel,
  updateStoryContent,
} from "../../queries/storyQueries";
//updating our story rows
const updateStoryController = async (req: Request, res: Response) => {
  const connection = await asyncConn();
  let preparedStatement: string;
  let values: Array<string | number>;
  console.log(req.body, "REQ>BODY");
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
  console.log(preparedStatement, values);
  try {
    const [row] = await connection.query(preparedStatement, values);
    console.log(row, "row");
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
