import { Response, Request } from "express";

const getUserDataController = (req: Request, res: Response): Response => {
  return res.status(200).json(req.user);
};
export default getUserDataController;
