import {Observable} from 'data/observable';
import {Fonepaisa} from 'nativescript-fonepaisa';
var http = require("http");

export class HelloWorldModel extends Observable {
  public message: string;
  private fonepaisa: Fonepaisa;
  public amount = 1.00;

  constructor() {
    super();
    this.fonepaisa = new Fonepaisa();
  }

  public pay(){
    let that = this;
    console.log('in component');
    console.log(this.amount);
    let API_KEY = "08Z1782051U62BY9OUGW4XM67GF2004";
    let payload = {
        API_KEY: API_KEY,
        id: "FPTEST",
        merchant_id: "FPTEST",
        merchant_display: "fonepaisa",
        invoice: new Date().getMilliseconds() + "FP",
        mobile_no: "7204853405",
        email: "",
        invoice_amt: this.amount,
        Environment: "Test",
        sign: null
    };
    let signed_ip = API_KEY+"#"+payload.id+"#"+payload.merchant_id+"#"+payload.invoice+"#"+payload.invoice_amt+"#";
    
    // try {
        http.request({
            url: "https://arthseed-dev.clu.pw/sign.php",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ hashinput: signed_ip })
        }).then(function (response) {
            var result = response.content.toJSON();
            console.log(result.res);
            payload.sign = result.res;
            console.dir(payload);
            that.fonepaisa.pay(payload).then(
              function(result){
                console.dir(result);
            },
              function (errorMessage) {
                console.log("No scan. ");
                console.dir(errorMessage);
            });            
        }, function (e) {
            console.log('error in api');
            console.dir("Error occurred " + e);
        });
    // } catch (e) {
    //     console.dir(e);
    // }    

  }
}
