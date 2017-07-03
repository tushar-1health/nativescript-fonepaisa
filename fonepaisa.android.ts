import { PayOptions, PayResult } from './fonepaisa.common';
import * as appModule from "application";
import * as utils from "utils/utils";
declare let com, android, fonepaisa, org, System: any;
var http = require("http");

export class Fonepaisa {
    public FONEPAISAPG_RET_CODE = 1;
    public Test_Environment = "Test";
    public Production_Environment = "Prod";

    constructor() {
        let self = this;
    }

    public pay(arg): Promise<PayResult> {
        console.log('in Fonepaisa@pay');
        
        let self = this;
        return new Promise((resolve, reject) => { 
            let intent: android.content.Intent = new android.content.Intent(
                appModule.android.foregroundActivity,fonepaisa.com.fonepaisapg_sdk.fonePaisaPG["class"]);
                        
            let API_KEY = arg.API_KEY;
            console.log('fonepaisa.com.fonepaisapg_sdk.fonePaisaPG 1');
            let json_to_be_sent = new org.json.JSONObject();
            try {
                json_to_be_sent.put("id", arg.id);    // Mandatory .. FPTEST is just for testing it has to be changed before going to production
                json_to_be_sent.put("merchant_id", arg.merchant_id);   // Mandatory .. FPTEST is just for testing it has to be changed before going to production
                json_to_be_sent.put("merchant_display", arg.merchant_display);  // Mandatory ..  change it to whatever you want to get it displayed
                json_to_be_sent.put("invoice", arg.invoice); //mandatory  .. this is the unique reference against which you can enquire and it can be system generated or manually entered
                json_to_be_sent.put("mobile_no", arg.mobile_no);    ///pass the mobile number if you have else send it blank and the customer will be prompted for the mobile no so that confirmation msg can be sent
                json_to_be_sent.put("email", arg.email);          // pass email if an invoice details has to be mailed
                json_to_be_sent.put("invoice_amt", arg.invoice_amt);    //pass the amount with two decimal rounded off
                json_to_be_sent.put("note", arg.note);         // pass any notes if you need
                json_to_be_sent.put("payment_types", arg.payment_types);    // not mandatory . this is to restrict the payment types
                json_to_be_sent.put("addnl_info", arg.addnl_info);          // pass any addnl data which u need to get baack
                //input for signing  API_KET#id#merchant_id#invoice#amount
                let signed_ip = API_KEY+"#"+json_to_be_sent.getString("id")+"#"+json_to_be_sent.getString("merchant_id")+"#"+json_to_be_sent.getString("invoice")+"#"+json_to_be_sent.getString("invoice_amt")+"#";
                json_to_be_sent.put("sign", arg.sign);
                json_to_be_sent.put("Environment", arg.Environment);  //mandatory   //Change it based on the environment you are using
                intent.putExtra("data",json_to_be_sent.toString());

                const onPayResult = (data) => {
                    console.log(">> activity result: @ " + new Date().getTime());
                    console.dir(data.requestCode);
                    if (data.resultCode === android.app.Activity.RESULT_OK) {
                        let message = data.intent.getStringExtra("resp_msg");
                        let code = data.intent.getStringExtra("resp_code");
                        let data_sent = data.intent.getStringExtra("data_sent");
                        let data_rec = data.intent.getStringExtra("data_recieved");
                        let result: PayResult = {
                            message: message,
                            code: code,
                            data_sent: data_sent,
                            data_received: data_rec,
                        };
                        resolve(result);
                    } else {
                        let message = data.intent.getStringExtra("resp_msg");
                        let code = data.intent.getStringExtra("resp_code");
                        let result: PayResult = {
                            message: message,
                            code: code,
                            data_sent: null,
                            data_received: null,
                        };                        
                        reject(result);
                    }                    
                    // if (data.requestCode === SCANNER_REQUEST_CODE) {
                        // self.onPermissionGranted = null;
                        // if (isContinuous) {
                        //     if (_onScanReceivedCallback) {
                        //     self.broadcastManager.unregisterReceiver(_onScanReceivedCallback);
                        //     _onScanReceivedCallback = undefined;
                        //     }
                        // } else {
                        //     if (data.resultCode === android.app.Activity.RESULT_OK) {
                        //     let format = data.intent.getStringExtra(com.google.zxing.client.android.Intents.Scan.RESULT_FORMAT);
                        //     let text = data.intent.getStringExtra(com.google.zxing.client.android.Intents.Scan.RESULT);
                        //     let result: PayResult = {
                        //         format: format,
                        //         text: text
                        //     };
                        //     resolve(result);
                        //     } else {
                        //     reject("Scan aborted");
                        //     }
                        // }
                    // arg.closeCallback && arg.closeCallback();
                    appModule.android.off('activityResult', onPayResult);
                    // }
                };

                appModule.android.on('activityResult', onPayResult);
                appModule.android.foregroundActivity.startActivityForResult(intent, self.FONEPAISAPG_RET_CODE);
                // let result: PayResult = {
                //     format: 'format',
                //     text: 'text'
                //   };
                //   resolve(result);
                // } else {
                //   reject("Scan aborted");
                // }                             
                   
            } catch(ex) {
                console.dir(ex);
                return false;
            }

            return true;
        });
    }

  
}