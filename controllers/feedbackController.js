import feedbackModel from "../models/feedbackModel.js";

class feedbackController {
  static createFeedback = async (req, res) => {
    const { buyer, comment, rating, order } = req.body;
    try {
      if (order) {
        const isFeedback = await feedbackModel.findOne({ order: order });
        console.log(isFeedback);
        if (isFeedback) {
          return res
            .status(400)
            .json({ message: "Feedback Already submitted for this order" });
        } else {
          const submitFeedback = feedbackModel({
            buyer,
            comment,
            rating,
            order,
          });
          const resFeedback = await submitFeedback.save();
          if (resFeedback) {
            return res
              .status(201)
              .json({ message: "Feedback submitted Successfully" });
          }
        }
      } else {
        return res.status(400).json({ message: "Order Id is necessary" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static getfeedback = async (req, res) => {
    try {
      const fetchAllfeedback = await feedbackModel
        .find()
        .populate("buyer", "clientname");
      return res.status(200).json(fetchAllfeedback);
    } catch (error) {
      return res.status(400).json({ message: "No Feedback Found" });
    }
  };

  static getSinglefeedback = async (req, res) => {
    const orderId = req.params.orderId;
    console.log(orderId);
    try {
      const fetchOrderFeedback = await feedbackModel.find({ order: orderId });
      return res.status(200).json(fetchOrderFeedback);
    } catch (error) {
      return res.status(400).json({ message: "No Feedback Found" });
    }
  };
}

export default feedbackController;
