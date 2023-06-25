import expres from "express";
const router = expres.Router();
import contactController from "../controllers/contactController.js";
import checkIsAdminAuthenticated from "../middlewares/adminMiddleware.js";

router.post("/submit-contact", contactController.contactRegister);
router.get(
  "/all-contacts",
  checkIsAdminAuthenticated,
  contactController.getAllcontact
);

export default router;
