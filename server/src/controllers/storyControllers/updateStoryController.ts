import { Request, Response } from "express";

import { asyncConn } from "../../db";
import { updateStory } from "../../queries/storyQueries";
//updating our story rows
const updateStoryController = async (req: Request, res: Response) => {
  const connection = await asyncConn();
  //feeding a dynamic array of fields and values into our prepared statment. Keys much mach with fields
  const keyArray = Object.keys(req.body.storyDetails);
  const valueArray = Object.values(req.body.storyDetails);

  try {
    const [row] = await connection.query(updateStory, [
      keyArray,
      valueArray,
      req.body.id,
    ]);

    if (!row || row.length === 0)
      throw Error("Could not retrieve the updated Story");
    res.status(204).json("successfully updated");
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json("Something went wrong with updating story");
    console.log(error);
  }
};
export default updateStoryController;
