import { Request, Response } from "express";
import { RowDataPacket, Connection } from "mysql2";
import { asyncConn } from "../../db";

import {
  createBoardTable,
  addBoard,
  createBoardUserReference,
  addUserBoardRef,
} from "../../queries/boardQueries";

interface SuccessReturn extends RowDataPacket {
  insertId: number;
}

export const boardCreateController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const connection = await asyncConn();
  if (!connection) return res.status(500).json("Could not connect to the DB");
  //first make the board if it does not already Exist
  try {
    await connection.query(createBoardTable);
  } catch (error) {
    console.log(error, "board table error");
    res.status(500).json("Could not create a DB table to insert Board into");
  }
  //then create our board
  try {
    //create our board
    const [rows] = await connection.query(addBoard, [
      req.body.name,
      req.body.headers.one,
      req.body.headers.two,
      req.body.headers.three,
    ]);
    console.log(rows.insertId, "board creation rows");
    if (!rows) res.status(500).json("could not create board");
    //this gets the [user id, board id] pairs to pass to our reference table
    const pairs = await getUserBoardPairs(
      rows.insertId,
      req.body.participants,
      connection
    );
    if (!pairs)
      throw Error("There was an error in referencing users and board");
    console.log(pairs, "pairs to insert");
    //create our reference table if it hasnt been created yet
    const refResult = await connection.query(createBoardUserReference);
    if (!refResult)
      throw Error("Could not make a reference table for users and boards");
    //when we have created this table insert our pairs
    const [refRows] = await connection.query(addUserBoardRef, [pairs]);
    console.log(refRows);
    //return created board, reftable
    res.status(201).json({
      board: rows,
      refTable: refRows,
      message: "board created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUserBoardPairs = async (
  boardId: number,
  participants: string[],
  conn: Connection
): Promise<number[][] | null> => {
  const pairs: number[][] = [];
  console.log(participants, "participants being passed through");
  try {
    //typescript doesnt have a connection type that returns a promise so we must assert it as any in this instance to call asyncronously
    const [rows]: { id: number }[][] | [] = await (conn as any).query(
      "SELECT id FROM users WHERE email IN (?)",
      [participants]
    );
    console.log(rows, "rows in getuserboardpairs");
    if (!rows || rows.length === 0) return null;
    //create an array of array of our user id, board id number
    rows.forEach((row) => pairs.push([row.id, boardId]));
  } catch (error) {
    console.log(error);
    return null;
  }
  return pairs;
};
