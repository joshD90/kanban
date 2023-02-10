import { Response, Request } from "express";

import { promisePool } from "../../db";
import { getUser } from "../../queries/authQueries";

export interface ReqUser extends Express.User {
  email?: string;
  id?: string;
  password?: string;
  fName?: string;
  lName?: string;
}

const getUserDataController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) return res.status(401).json({ message: "Not Authorised" });

  const user = req.user as ReqUser;
  try {
    //we need to get more full details than just what is stored in the cookie to pass back to server
    const [returnedUser] = await promisePool.query(getUser, [user.email]);

    delete returnedUser[0].hashedPW;
    return res.status(200).json({ ...returnedUser[0], isLoggedIn: true });
  } catch (error) {
    return res.status(200).json({ ...req.user, isLoggedIn: true });
  }
};
export default getUserDataController;
