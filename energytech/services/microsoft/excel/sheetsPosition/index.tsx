import { apiMicrosoft } from "../../apiMicrosoft";
import { SheetIndiceForm } from "@/interfaces/microsoft/excel/indicesSheets";

type driveItemid = {
  driveItemid: string;
}

export async function getSheetsPosition(driveItemid: driveItemid) {
  const response = await apiMicrosoft.get<SheetIndiceForm>(`items/${driveItemid}/workbook/worksheets`);
  return response.data;
}