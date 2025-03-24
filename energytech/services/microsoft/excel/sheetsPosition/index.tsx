import axios from "axios";
// import { apiMicrosoft } from "../../apiMicrosoft";
import { SheetIndiceForm } from "@/interfaces/microsoft/excel/indicesSheets";

type driveItemid = {
  driveItemid: string;
}

export async function getSheetsPosition(driveItemid: driveItemid, token:string) {
  const response = await axios.get<SheetIndiceForm>(`items/${driveItemid}/workbook/worksheets`,
    {
      baseURL: 'https://graph.microsoft.com/v1.0/me/drive/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  );
  return response.data;
}