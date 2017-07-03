import { PayResult } from './fonepaisa.common';
export declare class Fonepaisa {
    FONEPAISAPG_RET_CODE: number;
    Test_Environment: string;
    Production_Environment: string;
    constructor();
    pay(arg: any): Promise<PayResult>;
}
