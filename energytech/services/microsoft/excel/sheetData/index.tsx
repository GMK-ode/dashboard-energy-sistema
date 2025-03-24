import { SheetIndiceFormPromise } from "@/interfaces/microsoft/excel/dadosSheets";

import axios from "axios";



export async function getSheetsData(driveItemid: string, sheetName: string, token:string): Promise<SheetIndiceFormPromise> {
  const response = await axios.get(`items/${driveItemid}/workbook/worksheets('${sheetName}')/usedRange`,
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