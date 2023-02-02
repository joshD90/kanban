import { Request, Response } from "express";
import { asyncConn } from "../../db";

export const createStoryController = async (req: Request, res: Response) => {
  try {
    const connection = await asyncConn();
    const [rows, fields] = await connection.query("SELECT * FROM users");
    console.log(rows, fields);
    res.status(200).json({ rows: rows, fields: fields });
  } catch (error) {
    console.log(error);
  }
};
