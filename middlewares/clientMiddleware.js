import jwt from "jsonwebtoken";
import clientsModel from "../models/clientModel.js";

const checkIsClientAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      //Verify Token
      const { clientID } = jwt.verify(token, "SameerMalik");

      //Get User From Token
      req.client = await clientsModel.findById(clientID).select("--password");
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "unAuthorized User Please Login first" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "unAuthorized User Please Login first" });
  }
};

export default checkIsClientAuthenticated;
