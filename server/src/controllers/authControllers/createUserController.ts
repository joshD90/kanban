import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { asyncConn } from "../../db";
import { createUserTable, addUser } from "../../queries/authQueries";
//NB we need to add in a check to whether this uer exists already or not
const createUserController = async (req: Request, res: Response) => {
  //make sure that our data is in correct form
  const allStrings = Object.values(req.body).every(
    (value) => typeof value === "string"
  );
  if (!allStrings) return res.status(400).json("Not all data were strings");

  try {
    //make our hash
    const hashedPW = await bcrypt.hash(req.body.password, 10);
    const userArray = [
      req.body.email,
      req.body.fName,
      req.body.lName,
      hashedPW,
    ];
    //pass through to our query and insert into DB
    queryDB(req, res, userArray);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//function for actually querying db
const queryDB = async (req: Request, res: Response, queryArray: string[]) => {
  const connection = await asyncConn();
  if (!connection) return res.status(500).json("could not connect to DB ");
  //create a new table if one didn't exist
  try {
    if (!connection) throw Error("Could not connect to db");
    const dbResponse = await connection.query(createUserTable);
    if (!dbResponse)
      throw Error("There was no response from DB on Creating User");
  } catch (error) {
    if (error instanceof Error) res.status(500).json(error.message);
  }
  //once we have created the table then we insert the user
  try {
    const result = await connection.query(addUser, queryArray);

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error, "error generated while making new user");
      res.status(500).json(error.message);
    }
  }
};

export default createUserController;
