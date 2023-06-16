import expres from "express";
import clientController from "../controllers/clientController.js";
import checkIsClientAuthenticated from "../middlewares/clientMiddleware.js";
const router = expres.Router();

router.post("/client/register", clientController.clientRegister);
router.post("/client/login", clientController.clientLogin);

//Protected Route
router.post(
  "/change-password",
  checkIsClientAuthenticated,
  clientController.changePassword
);

export default router;
