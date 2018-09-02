import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import {Hero} from '../hero';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  /* selectedHero:Hero = {
      id:1,
      name:'Mansi'
    }; */
    selectedHero:Hero;
    myHeroes:Hero[];

  constructor(private heroService: HeroService, private msgSrvc:MessageService) { }

  ngOnInit() {
    this.getHeroesFromService();
  }

  onSelect(hero){
    this.selectedHero = hero;
    this.msgSrvc.add(hero.name + " is selected");
  }

  //can do void also
  getHeroesFromService(): void {
    //this.myHeroes = this.heroService.getHeroes();
    this.heroService.getHeroes().subscribe(heroes => this.myHeroes = heroes);
  }

  addNewHero(name: string): void{
    name=name.trim();
    if(!name) {
        return;
    }
    this.heroService.addNewHero({name} as Hero)
    .subscribe( hero => {
      this.myHeroes.push(hero);
    });  

  }

}
