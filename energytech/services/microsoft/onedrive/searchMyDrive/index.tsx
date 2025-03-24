import { OneDriveSearch } from "@/interfaces/microsoft/onedrive";
import axios from "axios";


export async function searchMyDrive(query: string, token:string): Promise<OneDriveSearch> {
  const response = await axios.get("root/search(q='" + query + "')?select=name,id,webUrl",
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
