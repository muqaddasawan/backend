import expres from "express";
const router = expres.Router();
import feedbackController from "../controllers/feedbackController.js";

router.post("/create", feedbackController.createFeedback);
router.get("/get-all", feedbackController.getfeedback);
router.get("/order_feedback/:orderId", feedbackController.getSinglefeedback);

export default router;
