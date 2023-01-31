import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { connection } from "../../db";
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

const queryDB = (req: Request, res: Response, queryArray: string[]) => {
  //create a new table if one didn't exist
  connection.query(createUserTable, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json("There was an error in creating the table");
    }

    //once we have created the table we can insert the user
    connection.query(addUser, queryArray, (error, result) => {
      if (error) {
        return res
          .status(500)
          .json("There was an error with trying to create a new user");
      }
      console.log(result);
      res.status(201).json(result);
    });
  });
};

export default createUserController;
