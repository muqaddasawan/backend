import expres from "express";
import payController, {
  braintreePaymentController,
  braintreeTokenController,
} from "../controllers/paymentOrderController.js";

const router = expres.Router();

//token
router.get("/token", braintreeTokenController);

//Payment
router.post("/payment", braintreePaymentController);

export default router;
