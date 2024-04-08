import jwt from "jsonwebtoken";
import UserModel from "../models/userModel1.js";

export const checkAutorization = async (req, res, next) => {
  let token;

  const { authorization } = req.headers;

  try {
    if (authorization && authorization.startsWith("Bearer")) {
      try {
        token = authorization.split(" ")[1];

        //verification
        const { userID } = jwt.verify(token, process.env.JWT_SECRETE_KEY);

        //get user from token

        req.user = await UserModel.findById(userID).select("-password -conf_password");
        next();

      } catch (error) {
        return res.status(400)({
          status: "Failed",
          message: "jwt not verified unauthorized user",
        });
      }
    }
  } catch (error) {
    return res.send({
      status: "failed",
      message: "no token for user",
    });
  }
};
