

export interface LastestCotationInfo {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};


export interface LastestCotation{
  USDBRL : LastestCotationInfo;
  EURBRL : LastestCotationInfo;
  XAUUSD : LastestCotationInfo;
  XAGUSD : LastestCotationInfo;
}