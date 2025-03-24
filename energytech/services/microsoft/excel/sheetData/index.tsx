import { SheetIndiceFormPromise } from "@/interfaces/microsoft/excel/dadosSheets";
import { apiMicrosoft } from "../../apiMicrosoft";



export async function getSheetsData(driveItemid: string, sheetName: string): Promise<SheetIndiceFormPromise> {
  const response = await apiMicrosoft.get(`items/${driveItemid}/workbook/worksheets('${sheetName}')/usedRange`);
  return response.data;
}