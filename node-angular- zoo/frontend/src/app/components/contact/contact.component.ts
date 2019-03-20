import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animations';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [fadeIn]
})
export class ContactComponent implements OnInit {
  title = 'contact';
  emailContacto: String;

  constructor() { }

  ngOnInit() {
    console.log('contact cargado');
  }

  guardarEmail(){
    
    localStorage.setItem('emailContacto', this.emailContacto.toString());
    
    // console.log(localStorage.getItem('emailContacto'));
  }

}
