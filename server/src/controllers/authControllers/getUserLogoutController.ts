import { Request, Response } from "express";

const getUserLogoutController = (req: Request, res: Response) => {
  try {
    res
      .clearCookie("jwt", { httpOnly: true, secure: false })
      .status(200)
      .json({ message: "Logout Success" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default getUserLogoutController;
