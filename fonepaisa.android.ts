import { Common } from './fonepaisa.common';
import * as appModule from "application";
import * as utils from "utils/utils";
declare let com, android, fonepaisa, org, System: any;
var http = require("http");
var fetchModule = require("fetch");

export class Fonepaisa extends Common {
    public FONEPAISAPG_RET_CODE = 1;
    public Test_Environment = "Test";
    public Production_Environment = "Prod";

    constructor() {
        super();
        let self = this;

    }

    public pay(args) {
        console.log('in Fonepaisa@pay');
        // console.dir(fonepaisa.com.fonepaisapg_sdk.fonePaisaPG);
        console.log('fonepaisa.com.fonepaisapg_sdk.fonePaisaPG');
        let self = this;
        return new Promise((resolve, reject) => { 
            let intent: android.content.Intent = new android.content.Intent(
                appModule.android.foregroundActivity,fonepaisa.com.fonepaisapg_sdk.fonePaisaPG["class"]);
            console.log('1');
            // TODO
            // Change it to more nativescript way as opposed to Java.
            let API_KEY = "08Z1782051U62BY9OUGW4XM67GF2004";
            let payload = {
                "id": "FPTEST",
                "merchant_id": "FPTEST",
                "merchant_display": "fonepaisa",
                "invoice": new Date().getMilliseconds() + "FP",
                "mobile_no": "720485",
                "email": "",
                "invoice_amt": "1.00"
            };
            console.log(payload['id']);
            let json_to_be_sent = new org.json.JSONObject();
            try {
                json_to_be_sent.put("id", "FPTEST");    // Mandatory .. FPTEST is just for testing it has to be changed before going to production
                json_to_be_sent.put("merchant_id", "FPTEST");   // Mandatory .. FPTEST is just for testing it has to be changed before going to production
                json_to_be_sent.put("merchant_display", "fonepaisa");  // Mandatory ..  change it to whatever you want to get it displayed
                json_to_be_sent.put("invoice", Date.now() + "FP"); //mandatory  .. this is the unique reference against which you can enquire and it can be system generated or manually entered
                json_to_be_sent.put("mobile_no", "7204853405");    ///pass the mobile number if you have else send it blank and the customer will be prompted for the mobile no so that confirmation msg can be sent
                json_to_be_sent.put("email", "");          // pass email if an invoice details has to be mailed
                json_to_be_sent.put("invoice_amt", "1.00");    //pass the amount with two decimal rounded off
                json_to_be_sent.put("note", "");         // pass any notes if you need
                json_to_be_sent.put("payment_types", "");    // not mandatory . this is to restrict the payment types
                json_to_be_sent.put("addnl_info", "");          // pass any addnl data which u need to get baack
                    //input for signing  API_KET#id#merchant_id#invoice#amount
                let signed_ip = API_KEY+"#"+payload["id"]+"#"+payload["merchant_id"]+"#"+payload["invoice"]+"#"+payload["invoice_amt"]+"#";
                console.log('2');
                console.log(signed_ip);
                
                /* *********************************************************************************************
                *               TODO                                                                           *
                *     Just for testing we have signed in the client side .                                     *
                *    Please do the signing on your server side . and pass the signed message in the json       *
                *                                                                                              *
                ************************************************************************************************/
                // console.dir(http);
                // let signed_msg = '';
                try {
                    http.request({
                        url: "https://arthseed-dev.clu.pw/sign.php",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify({ hashinput: signed_ip })
                    }).then(function (response) {
                        console.log('success from api');
                        console.dir(response);
                        var result = response.content.toJSON();
                        console.log(result.res);
                        // payload["sign"] = result.res;
                        // payload["Environment"] = self.Test_Environment;  //mandatory   //Change it based on the environment you are using
                        console.log('3');
                        json_to_be_sent.put("sign", result.res);
                        json_to_be_sent.put("Environment", self.Test_Environment);  //mandatory   //Change it based on the environment you are using
                        intent.putExtra("data",json_to_be_sent.toString());                        
                        // intent.putExtra("data",payload.toString());     
                        appModule.android.foregroundActivity.startActivityForResult(intent, self.FONEPAISAPG_RET_CODE);             
                        
                    }, function (e) {
                        console.log('error in api');
                        console.dir("Error occurred " + e);
                    });
                } catch (e) {
                    console.dir(e);
                }

                // let signed_msg = this.getSigned(signed_ip);
                
                // payload["sign"] = signed_msg;
                payload["Environment"] = self.Test_Environment;  //mandatory   //Change it based on the environment you are using
                console.log('3');
                
                intent.putExtra("data",payload.toString());     
                // appModule.android.foregroundActivity.startActivityForResult(intent, self.FONEPAISAPG_RET_CODE);
                   
            } catch(ex) {
                console.dir(ex);
                return false;
            }

            return true;
        });
    }

    private getSigned(input){
        console.log('about to start api call');
        http.request({
            url: "https://arthseed-dev.clu.pw/sign.php",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ hashinput: input })
        }).then(function (response) {
            console.log('success from api');
            console.dir(response);
            var result = response.content.toJSON();
            console.log(result);
            return response;                
            
        }, function (e) {
            console.log('error in api');
            console.dir("Error occurred " + e);
        });

        // fetchModule.fetch("https://6d38de61.ngrok.io/sign.php", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json"},
        //     body: JSON.stringify(data)
        // })
        // .then(r => { return r.json(); }).then(function (r) {
        //     console.log(r.response);

        //    // localStorage.setItem("redirectUrl", "patients");
        // }, function(error) {
        //     console.log(JSON.stringify(error));
        // })        
    }

    private getSignedMsg (input){
        try {
            /**************************************************************************************************************
            *                                    TODO                                                                     *
            *IMPORTANT : Signing of the message should be done in the backend to ensure that the keys are not compromised *
            *               and  can be modified on a regular  basis.                                                     *
            ***************************************************************************************************************/
            console.log('in getSignedMsg');

            let privKey="MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNzBfgbTSNp62zSYmScf9pwyr77QCEjGRvyuvHaRQ9AsPqYvxIwstar4WESLIKN9tUvvzE4xJGRuy7J0sGnehRom93fSWtdck6V+MCATfxUOfrRJCNqPEEcNi1809dcz1qsmUfZegG34p/ARURJ3bHAaVvS3YdX8tAwcnHFGX2QLl9/eX02qAZWbxpBFojsAlzpkF1E6NkaIaIiuymvPN1EmQQmeibeSUJlx6juUgtF2K9eS6hbke0khA2Upy+0nA6PLGDnpVuQnFpXG0UxiojLMdlh/Rv0oCadd2exYdGB2CT3q/NGHtDYSKnLU1xBImvS92nPMHVmO7gauoxKSQfAgMBAAECggEBAKM1BoJ/WLw2jHSxDx9KtOolU4NzU4PK6yQVY6NDXD9+X+0UD0uM4ETNCi/8juW3ooO06zUhd66wNLG/2aontMR487lpUGYeETXp2SgP21PPe/2C5LjTkECbVeIGUZyk9cIWNEgQQ1CgG2/ZZeGy0GnGjnKS/9sPy1tR1DnDnZEKG2jANGeE6H7ouYChFVwP85UEOgiHv2fmidRdfk5KrNw4prVelpznTOthKx/Zi+7q9oGkEie/PmE4hdCO1ucXUtOVxU3QMOBL0QWIhyBlWhTeY6nt7ayX4MnIweRsu4CQlP0LsrihmSfsEcgpIRteEQzhG9TuC1CVHvzI6XH2iQECgYEA6teV0RSCSUO9AB64A9p5wgB5V9+SkaBF3lCPfmJbOboQs5Jl0U5F3Ph7IfW1OzZDtqPThRfy+yV6+XWu3fczG3GP2OFCOrPlesmGXPTvWAWbfowEkiQCkddrRFmypI6QR2ZBItrHXhzPfR9Br8RybBzrLuUv7yho0BGCJ/ZnZ18CgYEA4FadXsVJnJxK65akI8ihGJpu1KgVmrKo6zYfplw3bdzoFPbLRAmuc09J9aQcuAQaCBEfguHeVNJb2CTAv90dx7E3gXHCDbW4SUcyybbTBBG5ZUIz4Ltv4LnLITqFKxiTpiOc+vi8+XFfOvDtqyXfBVVegIbV+xUiaOYPS4ULO0ECgYA0e1VZ0lGDegXk3viUs+B+AIkdoDMrJDw5AJvwzJ5Celh9KPxkGC/4v/cUkcqcnvXm/RmqJr4AblHbKfeYV0Qun+RbvYuFfuqL1DmY0IwkiaxETZo/5phEa3XnYnxP1iRcMHfiCC6B08Jy3edaFnbTvmq4ojNiKQ+zYBZMQ/671QKBgEX8/6+3YRXI9N626pJ3XzrrwzP5FHRk1Ko9AnbGQky2JHmV3Shm1NQIooxOHN+T+AMYRHpyuQhBcIHoRXIWK9pHAYgS03WvgcTqv3+K2B5m4S4kD0dHcsnrbOH6/dzKGBY2+hyaSWqQ4iLjU2KXuBJT5d23Mz7YAxoy3Aa1hSGBAoGAHJgJe7f6PT5BgeDZbC7yw1RcLyH7uFwMaTTZCHcnrsvz1FHbWLI4N5lCd08RBzyygEtIofQXGsxpE6wwyDGlnPHBZXnQsUWIm+eYQ4bl0O5mAunPVU9VWl6P8ynCoBqehbjAyy34b59XJ92gxcdK73ybVbHyemocPU4Fj8sp48o=";
            // Get private key from String
            let pk = this.loadPrivateKey(privKey);
            console.log('in getSignedMsg 1');
            let sign = java.security.Signature.getInstance("SHA512withRSA");
            console.log('in getSignedMsg 2');
            sign.initSign(pk);
            console.log('in getSignedMsg 3');
            sign.update(input.getBytes());
            console.log('in getSignedMsg 4');
            let hashBytes = sign.sign();
            console.log('in getSignedMsg 5');
            return this.bytesToHexString(hashBytes);

        }catch(e){
            console.dir(e);
            e.printStackTrace();
            return null;
        }


    }

    private bytesToHexString(bytes) {
        let sb = new java.lang.StringBuilder(bytes.length * 2);
            console.log('in bytesToHexString');
        
        let formatter = new java.util.Formatter(sb);
        for (let b in bytes) {
            formatter.format("%02x", b);
        }
        formatter.close();
        return sb.toString();
    }

    private loadPrivateKey(key64) {
        let privkeybytes = android.util.Base64.decode(key64,android.util.Base64.NO_WRAP);
        let fact;
            console.log('in loadPrivateKey');
        
        try {
            fact = java.security.KeyFactory.getInstance("RSA");
            let privateSpec = new java.security.spec.PKCS8EncodedKeySpec(privkeybytes);
            let privateKey1 =  fact.generatePrivate(privateSpec);
            return privateKey1;
        } catch (e) {
            // TODO Auto-generated catch block
            console.dir(e);
        }
        return null;
    }

}