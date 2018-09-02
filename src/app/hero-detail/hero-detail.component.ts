import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {Hero} from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() selectedHero:Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroById(id).subscribe(hero => this.selectedHero = hero)
  }

  goBack(){
    this.location.back();
  }

  save(){
    this.heroService.updateHero(this.selectedHero)
    .subscribe(() => this.goBack());
  }

  delete(hero: Hero): void{    
    this.heroService.deleteHero(this.selectedHero)
    .subscribe(() => this.goBack());
  }
}
