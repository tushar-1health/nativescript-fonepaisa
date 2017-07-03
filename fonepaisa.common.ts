export interface PayResult {
  message: string;
  code: string;
  data_sent: string;
  data_received: string;
}

export interface CommonPayOptions {
  API_KEY: string;
  id: string;
  merchant_id: string;
  merchant_display: string;
  invoice: string;
  mobile_no: string;
  email: string;
  invoice_amt: string;
  note: string;
  payment_types: string;
  addnl_info: string;
  sign: string;
  Environment: string;
 }

export interface IOS extends CommonPayOptions {}

export interface Android extends CommonPayOptions { }

export interface PayOptions extends IOS, Android {
  IOS?: IOS;
  Android?: Android;
}

export declare class Fonepaisa {
    pay(arg): Promise<PayResult>;
}