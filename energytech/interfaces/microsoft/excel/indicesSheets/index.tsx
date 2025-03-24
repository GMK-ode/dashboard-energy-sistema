interface SheetIndiceFormInfo {
  id: string;
  name: string;
  position: number;
  visible: string;
}

export interface SheetIndiceForm {
  sheets: SheetIndiceFormInfo[];
}