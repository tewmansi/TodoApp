import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  msgs:string[] = [];

  constructor() { }

  //no return type here
  add(newMsg:string){
    this.msgs.push(newMsg);
  }

  //no return type here
  clear(){
    this.msgs=[];
  }

}
