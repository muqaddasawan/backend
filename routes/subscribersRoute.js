import expres from "express";
const router = expres.Router();
import subscriberController from "../controllers/subscriberController.js";
import checkIsClientAuthenticated from "../middlewares/clientMiddleware.js";

router.post("/register", subscriberController.subscriberRegister);
router.get("/all-subscribers", subscriberController.getAllSubscribers);

export default router;
