import expres from "express";
import {
  braintreePaymentController,
  braintreeTokenController,
  getOrderController,
  getSingleOrderController,
  updateOrderStatusController,
  getBuyerOrderController,
} from "../controllers/paymentOrderController.js";

const router = expres.Router();

//token
router.get("/token", braintreeTokenController);

//Payment
router.post("/payment", braintreePaymentController);

//Orders
router.get("/orders", getOrderController);

//single Order
router.get("/order/:orderId", getSingleOrderController);

//single Order
router.get("/user-orders/:buyerId", getBuyerOrderController);

//single Order
router.put("/order-status/:orderId", updateOrderStatusController);

export default router;
