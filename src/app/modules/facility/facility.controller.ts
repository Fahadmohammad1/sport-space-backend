import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { FacilityService } from "./facility.service";
import sendResponse from "../../utils/sendResponse";

const createFacility = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilityService.createFacility(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Facility added successfully",
    data: result,
  });
});

const updateFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacilityService.updateFacility(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Facility updated successfully",
    data: result,
  });
});

const deleteFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacilityService.deleteFacility(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Facility deleted successfully",
    data: result,
  });
});

// get all facilities
const getAllFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilityService.getAllFacilities();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Facilities retrieved successfully",
    data: result,
  });
});

export const FacilityController = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacilities,
};
