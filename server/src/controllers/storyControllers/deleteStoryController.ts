import { Request, Response } from "express";

import { promisePool } from "../../db";
import { deleteStory } from "../../queries/storyQueries";

export const deleteStoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const connection = promisePool;

  if (!req.params.storyId)
    //malformed request
    return res.status(400).json("Could not delete as Id was not present");
  try {
    //delete and if successful send back status 204 / success but no information
    await connection.query(deleteStory, [req.params.storyId]);
    return res.status(204).json("Successfully Deleted");
  } catch (error) {
    if (error instanceof Error) return res.status(500).json(error.message);
    return res
      .status(500)
      .json("There was an error and could not delete document");
  }
};
