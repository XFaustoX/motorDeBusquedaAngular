import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazyImage.component.html'
})
export class LazyImageComponent implements OnInit{

  @Input()
  public url!:string;

  //si no esta manda el campo vacio
  @Input()
  public alt: string = '';

  //para saber si cargar el reload o la imagen
  public hasLoaded:boolean = false;

  ngOnInit(): void {
    if  (!this.url) throw new Error('URL property is required.');
  }

  onLoad(){
    console.log('Image Loaded');
    this.hasLoaded = true;
  }
 }
