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
router.put(
  "/:id",
  auth(ENUM_USER_ROLES.ADMIN),
  FacilityController.updateFacility
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLES.ADMIN),
  FacilityController.deleteFacility
);

router.get("/", FacilityController.getAllFacilities);

export const FacilityRoutes = router;
