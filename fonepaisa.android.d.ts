import { Common } from './fonepaisa.common';
export declare class Fonepaisa extends Common {
    FONEPAISAPG_RET_CODE: number;
    Test_Environment: string;
    Production_Environment: string;
    constructor();
    pay(args: any): Promise<{}>;
    private getSigned(input);
    private getSignedMsg(input);
    private bytesToHexString(bytes);
    private loadPrivateKey(key64);
}
