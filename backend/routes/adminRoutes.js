import express from "express";
import { editUser } from "../controllers/adminController.js";

const router = express.Router();

router.put("/editProfile/:id", editUser);

export default router;