import { Request, Response } from "express";
import { connection } from "../../db";

import { createBoardTable, addBoard } from "../../queries/boardQueries";

export const boardCreateController = (req: Request, res: Response): void => {
  //make sure a table has been created first
  connection.query(createBoardTable, (err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json("There was an issue with creating the DB Table");
    }
    //insert our new board into the table
    connection.query(
      addBoard,
      [req.body.name, req.body.headers, req.body.participants],
      (error, result) => {
        if (error) {
          console.log("error with adding Board", error);
          return res
            .status(500)
            .json("there was an issue with adding your new board");
        }
        console.log(result);
        res.status(201).json(result);
      }
    );
  });
};
