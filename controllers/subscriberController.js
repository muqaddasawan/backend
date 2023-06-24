import subscribersModel from "../models/subscribersModel.js";

class subscriberController {
  static subscriberRegister = async (req, res) => {
    const email = req.body.email;

    try {
      if (email) {
        const issubscribed = await subscribersModel.findOne({ email: email });
        console.log(issubscribed);
        if (issubscribed) {
          return res.status(400).json({ message: "This email already exist" });
        } else {
          const newSubscriber = subscribersModel({
            email,
          });
          const resSubscriber = await newSubscriber.save();
          if (resSubscriber) {
            return res.status(201).json({ message: "Registered Successfully" });
          }
        }
      } else {
        return res.status(400).json({ message: "Email Required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static getAllSubscribers = async (req, res) => {
    try {
      const fetchAllSubscriber = await subscribersModel.find();
      return res.status(200).json(fetchAllSubscriber);
    } catch (error) {
      return res.status(400).json({ message: "No Subscriber Found" });
    }
  };
}

export default subscriberController;
