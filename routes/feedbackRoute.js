import expres from "express";
const router = expres.Router();
import feedbackController from "../controllers/feedbackController.js";
import checkIsClientAuthenticated from "../middlewares/clientMiddleware.js";

router.post(
  "/create",
  checkIsClientAuthenticated,
  feedbackController.createFeedback
);
router.get("/get-all", feedbackController.getfeedback);
router.get("/order_feedback/:orderId", feedbackController.getSinglefeedback);

export default router;
