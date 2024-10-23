import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'eaTCiBRgYRZgwgfTyoDchjMGwggamn6x';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http:HttpClient) { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();

    //lo incluye si no esta en la lista
    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag) //filtra los tags y solo deja pasar al que no esta almacenado
    }

    this._tagsHistory.unshift( tag); //coloca el nuevo tag al comienzo
    this._tagsHistory = this.tagsHistory.splice(0,10); // solo mostrara 10 tags en pantalla
  }

  searchTag( tag: string):void{
    if ( tag.length === 0) return; //para que si no se escribe nada no haga nada
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag )

    this.http.get<SearchResponse>(`${ this.serviceUrl}/search`, { params }) //url sacada de postman (esta completa con la busqueda y el limite)
      .subscribe(resp =>{ //<SearchResponse> le da directamente la clase a resp

       this.gifList = resp.data;


      })

  }
}
