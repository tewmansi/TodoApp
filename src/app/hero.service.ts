import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(
    private http: HttpClient,
    private msgSrvc: MessageService) 
    { }

  /* getHeroes(): Hero[] {
    return HEROES;
  } */

  //Observable is the return type here
  getHeroes(): Observable<Hero[]> {
    /* this.msgSrvc.add("getting heroes list");
    return of(HEROES); 
    this.log("getting heroes list"); */
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log('fetched heroes inside pipe tap')),
      catchError(this.handleError('getHeroes',[]))
    );
  }

  private handleError<T>(operation = 'operation',result ?:T){
    return(err: any):Observable<T> => {
      console.error(err);
      this.log(`${operation} failed with error ${err.message}`);
      return of(result as T);
    }
  }

  getHeroById(id: number): Observable<Hero> {
   /*  this.log("getting heroes list by id="+id);
    return of(HEROES.find(hero => hero.id === id)); */
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero by id=${id}`)),
      catchError(this.handleError<Hero>(`error in getHeroById id=${id}`))
    );
  }

  updateHero(newHero: Hero): Observable<Hero> {
   
    return this.http.put<Hero>(this.heroesUrl, newHero, httpOptions).pipe(
      tap(_ => this.log(`updating hero with name ${newHero.name}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private log(message: string){
    this.msgSrvc.add(`HeroService: ${message}`);
  }

  addNewHero(newHero: Hero): Observable<Hero>{    

    return this.http.post<Hero>(this.heroesUrl, newHero, httpOptions).pipe(
      tap(_ => this.log(`adding hero with name ${newHero.name}`)),
      catchError(this.handleError<any>('addNewHero'))
    );
  }

  deleteHero(hero: Hero):Observable<Hero>{
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleting hero with name ${hero.name}`)),
      catchError(this.handleError<any>('deleteHero'))
    );
  }

  searchHeroes(term:string):Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }
    const url = `${this.heroesUrl}\?name=${term}`;
    return this.http.get<Hero[]>(url).pipe(
      tap(_ => this.log(`searching hero with name ${term}`)),
      catchError(this.handleError<any>('searchHeroes'))
    );
  }
}



