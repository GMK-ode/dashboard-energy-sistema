interface OneDriveItem {
  id: string;
  name: string;
  webUrl: number;
}

export interface OneDriveSearch{
  value: OneDriveItem[];
}