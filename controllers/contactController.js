import contactModel from "../models/contactModel.js";

class contactController {
  static contactRegister = async (req, res) => {
    const { email, message, name, phone } = req.body;
    console.log(email, message, name, phone);
    try {
      if (email) {
        const newContact = contactModel({
          email,
          message,
          name,
          phone,
        });
        const resContact = await newContact.save();
        if (resContact) {
          return res.status(201).json({ message: "Submitted Successfully" });
        }
      } else {
        return res.status(400).json({ message: "Email Required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static getAllcontact = async (req, res) => {
    try {
      const fetchAllcontact = await contactModel.find();
      return res.status(200).json(fetchAllcontact);
    } catch (error) {
      return res.status(400).json({ message: "No Contact Found" });
    }
  };
}

export default contactController;
