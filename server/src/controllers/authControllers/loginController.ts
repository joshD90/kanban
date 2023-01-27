import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
//once successfully carrying out the LocalStrategy logic the user object is passed to our req
const loginController = async (req: Request, res: Response): Promise<any> => {
  console.log(req.user);
  res
    .status(200)
    .json({
      user: req.user,
      message: "You have successfully logged in and created a req.user",
    });
};

export default loginController;
