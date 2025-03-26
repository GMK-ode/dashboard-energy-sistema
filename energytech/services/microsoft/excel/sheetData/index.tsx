import { SheetIndiceFormPromise } from "@/interfaces/microsoft/excel/dadosSheets";
import { apiMicrosoft } from "../../apiMicrosoft";
import axios from "axios";
import { apiMock } from "@/services/mockAPi/apiMock";
import { TokenMockForm } from "@/interfaces/mockAPI";


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";




export async function patchTokenSheetsData(token: string): Promise<SheetIndiceFormPromise> {
  const response = await apiMicrosoft.patch(`items/0132CK6B5OBPQZE5R64ZCLAS2DMDQBT6UO/workbook/worksheets('base')/usedRange`,
    {
      "values": [
        [token]
      ]
    }
  );
  return response.data;
}

export async function getSheetsDataCredencial(): Promise<SheetIndiceFormPromise> {
  const response = await apiMicrosoft.get(`items/0132CK6B5OBPQZE5R64ZCLAS2DMDQBT6UO/workbook/worksheets('base')/usedRange`);
  return response.data;
}



export async function putCredencialTV(token: string, savedData:string): Promise<TokenMockForm> {
  const response = await apiMock.put(`/dashboard/1`,
    {
      token: token,
      savedData: savedData
    }
  );
  return response.data;
}

export async function getCredencialTV(): Promise<TokenMockForm> {
  const response = await apiMock.get(`/dashboard/1`);
  return response.data;
}



export async function getSheetsData(driveItemid: string, sheetName: string, token: string): Promise<SheetIndiceFormPromise> {
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
