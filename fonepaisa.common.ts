import { Observable } from 'data/observable';
import * as app from 'application';
import * as dialogs from 'ui/dialogs';

export class Common extends Observable {
  public message: string;

  constructor() {
    super();
    // this.message = Utils.SUCCESS_MSG();
  }
}

export class Utils {
  public static SUCCESS_MSG(): string {
    let msg = `Your plugin is working on ${app.android ? 'Android' : 'iOS'}.`;

    setTimeout(() => {
      dialogs.alert(`${msg} For real. It's really working :)`).then(() => console.log(`Dialog closed.`));
    }, 2000);

    return msg;
  }
}


export declare class Fonepaisa {
    // private _observer;
    // private _observerActive;
    // private _currentVolume;
    // private _scanner;
    // constructor();
    // private _hasCameraPermission;
    // private _hasDeniedCameraPermission;
    // private _addVolumeObserver;
    // private _removeVolumeObserver;
    // private _enableTorch;
    // private _disableTorch;
    // available(): Promise<boolean>;
    // hasCameraPermission(): Promise<boolean>;
    // requestCameraPermission(): Promise<boolean>;
    // stop(): Promise<any>;
    pay(arg);
}