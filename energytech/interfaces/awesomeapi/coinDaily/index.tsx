

export interface DailyCoinCotationInfo {
  ask: string,
  bid: string,
  code?: string,
  codein?: string,
  create_date: string,
  high: string,
  low: string,
  name?: string,
  pctChange: string,
  timestamp: string,
  varBid: string,
}

export interface DailyCoinCotation {
  [index:number]: DailyCoinCotationInfo;
}