import {Observable} from 'data/observable';
import {Fonepaisa} from 'nativescript-fonepaisa';

export class HelloWorldModel extends Observable {
  public message: string;
  private fonepaisa: Fonepaisa;

  constructor() {
    super();

    this.fonepaisa = new Fonepaisa();
    this.message = this.fonepaisa.message;
  }
}