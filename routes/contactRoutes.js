import expres from "express";
const router = expres.Router();
import contactController from "../controllers/contactController.js";

router.post("/submit-contact", contactController.contactRegister);
router.get("/all-contacts", contactController.getAllcontact);

export default router;
