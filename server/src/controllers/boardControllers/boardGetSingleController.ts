import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";

import { promisePool } from "../../db";
import { checkBoardBelongs, getSingleBoard } from "../../queries/boardQueries";
import { ReqUser } from "../authControllers/getUserDataController";

//get a single board and any attached stories
export const boardGetSingleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = req.user as ReqUser;
  //can't search a board without an id
  if (!req.params.boardId)
    return res.status(400).json("No boards id to search");

  const connection = promisePool;
  try {
    const [rows] = await connection.query(getSingleBoard, [req.params.boardId]);

    //if none can be found
    if (!rows) throw Error("Could not fetch any boards matching this id");
    if (rows.length === 0)
      return res.status(404).json("Could not find a board matching this id");
    //need to do a check whether the user id matches our req.user.id and to see whether the board id matches boards belonging to user
    const [boardsBelonging] = await promisePool.query(checkBoardBelongs, [
      user.id,
      req.params.boardId,
    ]);
    console.log(boardsBelonging, "boardsBelonging");
    if (!boardsBelonging || boardsBelonging.length === 0)
      return res
        .status(401)
        .json({ message: "You are not allowed to access this board" });

    //parse the stories section of our data as this has been stringified
    const { title, description, board_id, status_panel, ...boardProps } =
      rows[0];
    const boardWithStories = {
      id: board_id,
      ...boardProps,
      stories: rows.map((row: RowDataPacket) => {
        const { name, panel1, panel2, panel3, ...rest } = row;

        return { ...rest };
      }),
    };

    return res.status(200).json(boardWithStories);
  } catch (error) {
    //type checking our error
    console.log(error);
    if (error instanceof Error) return res.status(500).json(error.message);
    //needs to return a response
    return res.status(500).json(error);
  }
};
