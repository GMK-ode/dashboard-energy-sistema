import { OneDriveSearch } from "@/interfaces/microsoft/onedrive";
import { apiMicrosoft } from "../../apiMicrosoft";

export async function searchMyDrive(query: string): Promise<OneDriveSearch> {
  const response = await apiMicrosoft.get("root/search(q='" + query + "')?select=name,id,webUrl");
  return response.data;
} 
