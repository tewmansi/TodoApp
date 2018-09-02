import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboadHeroes: Hero[] = [];

  constructor(private heroSrvc: HeroService) { }

  ngOnInit() {
    this.getHeroesForDashBoard();
  }

  getHeroesForDashBoard(){
    //showing first 4 heroes only
    this.heroSrvc.getHeroes()
      .subscribe(heroes => this.dashboadHeroes = heroes.slice(1, 5));
  }
}
