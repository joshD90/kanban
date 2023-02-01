import { Request, response, Response } from "express";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { connection } from "../../db";

import {
  createBoardTable,
  addBoard,
  createBoardUserReference,
} from "../../queries/boardQueries";

interface SuccessReturn extends RowDataPacket {
  insertId: number;
}

export const boardCreateController = (req: Request, res: Response): void => {
  //make sure a table has been created first
  connection.query(createBoardTable, (err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json("There was an issue with creating the DB Table");
    }
    console.log(req.body.headers, "headers");
    //insert our new board into the table
    connection.query(
      addBoard,
      [
        req.body.name,
        req.body.headers.one,
        req.body.headers.two,
        req.body.headers.three,
      ],
      (error, result) => {
        if (error || !result) {
          console.log("error with adding Board", error);
          return res
            .status(500)
            .json("there was an issue with adding your new board");
        }
        console.log(typeof result, "TYPE OF RESULT");

        connection.query(createBoardUserReference, (refErr) => {
          if (refErr) {
            console.log(
              "Board was created but could not link with users",
              refErr
            );
            res
              .status(500)
              .json("Board was created but could not link with users");
          }
        });

        // res.status(201).json(result);
      }
    );
  });
};
