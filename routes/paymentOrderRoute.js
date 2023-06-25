import expres from "express";
import {
  braintreePaymentController,
  braintreeTokenController,
  getOrderController,
  getSingleOrderController,
  updateOrderStatusController,
  getBuyerOrderController,
} from "../controllers/paymentOrderController.js";
import checkIsClientAuthenticated from "../middlewares/clientMiddleware.js";
import checkIsAdminAuthenticated from "../middlewares/adminMiddleware.js";

const router = expres.Router();

//token
router.get("/token", braintreeTokenController);

//Payment
router.post("/payment", checkIsClientAuthenticated, braintreePaymentController);

//Orders
router.get("/orders", getOrderController);

//single Order
router.get("/order/:orderId", getSingleOrderController);

//single Order
router.get(
  "/user-orders/:buyerId",
  checkIsClientAuthenticated,
  getBuyerOrderController
);

//single Order
router.put(
  "/order-status/:orderId",
  checkIsAdminAuthenticated,
  updateOrderStatusController
);

export default router;
