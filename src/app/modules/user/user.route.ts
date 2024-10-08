import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.userZodSchema),
  UserController.createUser
);
router.post("/login", UserController.loginUser);

export const UserRoutes = router;
