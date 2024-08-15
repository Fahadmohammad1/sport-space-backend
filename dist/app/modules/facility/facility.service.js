"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const facility_model_1 = __importDefault(require("./facility.model"));
const createFacility = (facilityInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const createdFacility = yield facility_model_1.default.create(facilityInfo);
    if (!createdFacility) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create facility");
    }
    return createdFacility;
});
// update facility
const updateFacility = (facilityId, facilityInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const isFacilityExist = yield facility_model_1.default.findOne({ _id: facilityId });
    if (!isFacilityExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Facility not found");
    }
    const updatedFacility = yield facility_model_1.default.findByIdAndUpdate(facilityId, facilityInfo, { new: true });
    if (!updatedFacility) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update the facility");
    }
    return updatedFacility;
});
const deleteFacility = (facilityId) => __awaiter(void 0, void 0, void 0, function* () {
    const isFacilityExist = yield facility_model_1.default.findOne({ _id: facilityId });
    if (!isFacilityExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Facility not found");
    }
    const updatedFacility = yield facility_model_1.default.findByIdAndUpdate(facilityId, { isDeleted: true }, { new: true });
    if (!updatedFacility) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete the facility");
    }
    return updatedFacility;
});
// get all facilities
const getAllFacilities = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield facility_model_1.default.find({ isDeleted: false });
});
exports.FacilityService = {
    createFacility,
    updateFacility,
    deleteFacility,
    getAllFacilities,
};
