import { Request, Response } from "express";

import { asyncConn } from "../../db";
import { getAllUserBoards } from "../../queries/boardQueries";
//gets all boards that a user is part of
export const boardGetAllController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.params.userId;
  if (!userId) return res.status(400).json("No User Id");
  const connection = await asyncConn();
  try {
    //uses our reference table in query
    const [row] = await connection.query(getAllUserBoards, [userId]);
    console.log(row);
    return res.status(200).json(row);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json("There was an issue in fetching boards associated with user");
  }
};
