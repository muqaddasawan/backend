import clientsModel from "../models/clientModel.js";
import bcrytptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class clientController {
  static clientRegister = async (req, res) => {
    const { clientname, email, city, password } = req.body;
    try {
      if (clientname && email && city && password) {
        const isClient = await clientsModel.findOne({ email: email });
        if (isClient) {
          return res.status(400).json({ message: "This email already exist" });
        } else {
          //Password hashing
          const genSalt = await bcrytptjs.genSalt(10);
          const hashPassword = await bcrytptjs.hash(password, genSalt);

          //save client
          const newClient = clientsModel({
            clientname,
            email,
            city,
            password: hashPassword,
          });
          const resClient = await newClient.save();
          if (resClient) {
            return res
              .status(201)
              .json({ message: "Registered Successfully", client: resClient });
          }
        }
      } else {
        return res.status(400).json({ message: "All Fields are Required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static clientLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isClient = await clientsModel.findOne({ email: email });
        if (isClient) {
          if (
            email === isClient.email &&
            (await bcrytptjs.compare(password, isClient.password))
          ) {
            //Generate Token
            const token = jwt.sign({ clientID: isClient._id }, "SameerMalik", {
              expiresIn: "2d",
            });
            return res.status(200).json({
              message: "Login Successful",
              token,
              clientID: isClient._id,
              clientname: isClient.clientname,
            });
          } else {
            return res.status(400).json({ message: "Invalid Credentials" });
          }
        } else {
          return res
            .status(400)
            .json({ message: "This email is not registered" });
        }
      } else {
        return res.status(400).json({ message: "All fields are Required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static changePassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    try {
      if (newPassword && confirmPassword) {
        if (newPassword === confirmPassword) {
          const genSalt = await bcrytptjs.genSalt(10);
          const hashedPassword = await bcrytptjs.hash(newPassword, genSalt);
          await clientsModel.findByIdAndUpdate(req.client._id, {
            password: hashedPassword,
          });
          return res
            .status(200)
            .json({ message: "Password Changed Successfully" });
        } else {
          return res
            .status(400)
            .json({ message: "password and confirm password does not match" });
        }
      } else {
        return res.status(400).json({ message: "All Fields are Required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default clientController;
