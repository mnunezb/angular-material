import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations' 
import { fadeIn } from '../animations';
import { from } from 'rxjs';
// declare var jQuery: any;
declare var $: any;
// import * as $ from 'jquery'

@Component({
  selector: 'tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  animations: [
    trigger('marcar', [
      state('inactive', style({
        border: '5px solid #ccc'
      })),
      state('active', style({
        'border': '5px solid yellow',
        'background': 'red',
        'border-radius': '50px',
        transform: 'scale(1.2)'
      })),
        transition('inactive => active', animate('3s linear')),
        transition('active => inactive', animate('3s linear'))
    ]),
    fadeIn
  ]
})
export class TiendaComponent implements OnInit {

  public titulo;
  public nombreDelParque: String;
  public miParque;
  public state;

  constructor() {
    this.titulo = 'Esta es la tienda';
    this.state = 'inactive';
   }

  ngOnInit() {
      $('#textojq').hide();
      $('#botonjq').click(function(){
        console.log('Jquery click');
        $('#textojq').slideToggle();
      });

      $('#caja').dotdotdot({});
  }

  mostrarNombre(){
    console.log(this.nombreDelParque);
  }

  verDatosParque(event){
    console.log(event);
    this.miParque = event;
  }
  changeState(){
    if(this.state == 'active'){
      this.state = 'inactive'
    }else{
      this.state = 'active'
    }
  }

}
