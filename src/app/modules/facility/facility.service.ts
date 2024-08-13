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

// update facility
const updateFacility = async (
  facilityId: string,
  facilityInfo: Partial<TFacility>
) => {
  const isFacilityExist = await Facility.findOne({ _id: facilityId });

  if (!isFacilityExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Facility not found");
  }

  const updatedFacility = await Facility.findByIdAndUpdate(
    facilityId,
    facilityInfo,
    { new: true }
  );

  if (!updatedFacility) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update the facility");
  }

  return updatedFacility;
};

const deleteFacility = async (facilityId: string) => {
  const isFacilityExist = await Facility.findOne({ _id: facilityId });

  if (!isFacilityExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Facility not found");
  }

  const updatedFacility = await Facility.findByIdAndUpdate(
    facilityId,
    { isDeleted: true },
    { new: true }
  );

  if (!updatedFacility) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete the facility");
  }

  return updatedFacility;
};

export const FacilityService = {
  createFacility,
  updateFacility,
  deleteFacility,
};
