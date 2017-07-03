import { PayOptions, PayResult } from './fonepaisa.common';

export class Fonepaisa {

    constructor() {
        let self = this;
    }

    public pay(arg): Promise<PayResult> {
        let self = this;
        return new Promise((resolve, reject) => {
            let result: PayResult = {
                message: 'string',
                code: 'string',
                data_sent: 'string',
                data_received: 'string',
                };
                resolve(result);
         });        

    }
}