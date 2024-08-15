"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const facility_controller_1 = require("./facility.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const facility_validation_1 = require("./facility.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_1.ENUM_USER_ROLES.ADMIN), (0, validateRequest_1.default)(facility_validation_1.FacilityValidation.facilityZodSchema), facility_controller_1.FacilityController.createFacility);
router.put("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLES.ADMIN), facility_controller_1.FacilityController.updateFacility);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLES.ADMIN), facility_controller_1.FacilityController.deleteFacility);
router.get("/", facility_controller_1.FacilityController.getAllFacilities);
exports.FacilityRoutes = router;
