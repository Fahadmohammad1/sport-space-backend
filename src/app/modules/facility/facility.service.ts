import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { TFacility } from "./facility.interface";
import Facility from "./facility.model";

const createFacility = async (facilityInfo: TFacility) => {
  const createdFacility = await Facility.create(facilityInfo);

  if (!createdFacility) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create facility");
  }

  return createdFacility;
};

export const FacilityService = {
  createFacility,
};
