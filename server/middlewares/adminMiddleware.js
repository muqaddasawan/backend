import jwt from "jsonwebtoken";
import adminsModel from "../models/adminModel.js";

const checkIsAdminAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      //Verify Token
      const { adminID } = jwt.verify(token, "feelingAPleasantSmell");

      //Get User From Token
      req.admin = await adminsModel.findById(adminID).select("--password");
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "unAuthorized Admin Please Login first" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "unAuthorized Admin Please Login first" });
  }
};

export default checkIsAdminAuthenticated;
