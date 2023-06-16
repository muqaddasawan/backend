import expres from "express";
import adminController from "../controllers/adminController.js";
import checkIsAdminAuthenticated from "../middlewares/adminMiddleware.js";
const router = expres.Router();

router.post("/admin-user/admin-register", adminController.adminRegister);
router.post("/admin-user/admin-login", adminController.adminLogin);

//Protected Route
router.post(
  "/admin-user/admin-change-password",
  checkIsAdminAuthenticated,
  adminController.changePassword
);

export default router;
