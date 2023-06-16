import adminsModel from "../models/adminModel.js";
import bcrytptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class adminController {
  static adminRegister = async (req, res) => {
    const { adminname, email, password } = req.body;
    try {
      if (adminname && email && password) {
        const isAdmin = await adminsModel.findOne({ email: email });
        if (isAdmin) {
          return res.status(400).json({ message: "This email already exist" });
        } else {
          //Password hashing
          const genSalt = await bcrytptjs.genSalt(10);
          const hashPassword = await bcrytptjs.hash(password, genSalt);

          //save admin
          const newAdmin = adminsModel({
            adminname,
            email,
            password: hashPassword,
          });
          const resAdmin = await newAdmin.save();
          if (resAdmin) {
            return res.status(201).json({
              message: "New Admin Created Successfully",
              admin: resAdmin,
            });
          }
        }
      } else {
        return res.status(400).json({ message: "All Fields are Required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isAdmin = await adminsModel.findOne({ email: email });
        if (isAdmin) {
          if (
            email === isAdmin.email &&
            (await bcrytptjs.compare(password, isAdmin.password))
          ) {
            //Generate Token
            const token = jwt.sign(
              { adminID: isAdmin._id },
              "feelingAPleasantSmell",
              {
                expiresIn: "2d",
              }
            );
            return res.status(200).json({
              message: "Login Successful",
              token,
              adminname: isAdmin.adminname,
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
          await adminsModel.findByIdAndUpdate(req.admin._id, {
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

export default adminController;
