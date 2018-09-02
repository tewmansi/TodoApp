import { Component } from '@angular/core';
import { throws } from 'assert';

@Component({
  selector: 'timer',
  template: `
  <h1>{{minutes}}:{{seconds | number:'2.0'}}</h1>
  <p>
  <button (click)="togglePause()">{{buttonLabel}}</button>
  </p>
  `
})

export class TimerComponent {
  minutes: number;
  seconds: number;
  isPaused: boolean;
  buttonLabel: string;

  constructor(){
      this.reset();
      setInterval(()=> this.tick(),1000);
      this.buttonLabel = 'Start';
      this.togglePause();
  }

    reset(){
        this.minutes= 24;
        this.seconds=59
    }

    tick(){
        if(!this.isPaused){
            if(--this.seconds<0){
                this.seconds = 59;
                if(--this.minutes<0){
                    this.reset();
                }
            }
        }
    }

    togglePause(){
        this.isPaused = !this.isPaused;
        if(this.minutes<24|| this.seconds<59){
            this.buttonLabel = this.isPaused ? 'Resume' : 'Start'
        }
    }
}
