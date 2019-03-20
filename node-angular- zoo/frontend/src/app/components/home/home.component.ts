import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animations';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeIn]
})
export class HomeComponent implements OnInit {
  title = 'Bienvenido'

  constructor() { }

  ngOnInit() {
    console.log('Home.component cargado');
  }

}
