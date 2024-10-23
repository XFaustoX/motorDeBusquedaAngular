import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
    selector: 'shared-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService){} //inyecta el servicio global

  // al ser privado debemos crear un get para poder hacer uso
  get tags():string[]{
    return this.gifsService.tagsHistory; //me traigo los tagshistory para usarlos
  }

  //metodo para que al dar click al nombre vuelva a esa busqueda
  searchTag(tag:string):void{
    this.gifsService.searchTag(tag);
  }
}
