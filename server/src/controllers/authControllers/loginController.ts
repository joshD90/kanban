import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";

import config from "../../config";

interface TokenCredentials extends Express.User {
  email?: string;
  id?: number;
}

//once successfully carrying out the LocalStrategy logic the user object is passed to our req
const loginController = (req: Request, res: Response): Response => {
  if (!req.user)
    return res
      .status(500)
      .json({ message: "There was an issue with verifying your credentials" });
  const user: TokenCredentials = req.user;
  try {
    //create our token
    const token = jwt.sign(
      { email: user.email, id: user.id },
      config.jwt.secret as string,
      { expiresIn: "1d" }
    );
    //send back our cookie for http only, and send back our user for our auth context
    return res
      .cookie("jwt", token, { httpOnly: true, secure: false })
      .status(200)
      .json(user);
  } catch (error) {
    return res.status(500).json({ message: "There was an error logging in" });
  }
};

export default loginController;
// res
// .cookie('jwt',
//     token, {
//         httpOnly: true,
//         secure: false //--> SET TO TRUE ON PRODUCTION
//     }
// )
// .status(200)
// .json({
//     message: 'You have logged in :D'
// })

// router.get('/logout', (req, res) => {
//   if (req.cookies['jwt']) {
//       res
//       .clearCookie('jwt')
//       .status(200)
//       .json({
//           message: 'You have logged out'
//       })
//   } else {
//       res.status(401).json({
//           error: 'Invalid jwt'
//       })
//   }
// })

//jwtfromrequest: cookieextractor
