import {Observable} from 'data/observable';
import {Fonepaisa} from 'nativescript-fonepaisa';

export class HelloWorldModel extends Observable {
  public message: string;
  private fonepaisa: Fonepaisa;

  constructor() {
    super();

    this.fonepaisa = new Fonepaisa();
  }

  public pay(){
    console.log('in component');
    this.fonepaisa.pay({}).then(function(result){
      console.dir(result);
    });
  }
}