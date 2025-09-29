export interface linksDataType {
  _id: string;
  shortlink: string;
  originallink: string;
  qrcode: string;
  qrcodedescription: string;
  clicks: number;
  status: boolean;
  date: string;
}