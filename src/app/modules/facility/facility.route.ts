import express from "express";
import { FacilityController } from "./facility.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLES } from "../../enums/user";

const router = express.Router();

router.post(
  "/",
  auth(ENUM_USER_ROLES.ADMIN),
  FacilityController.createFacility
);

export const FacilityRoutes = router;
