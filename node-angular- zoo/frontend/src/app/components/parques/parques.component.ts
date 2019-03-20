import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { fadeIn } from '../animations';

@Component({
  selector: "parques",
  templateUrl: "./parques.component.html",
  styleUrls: ["./parques.component.css"],
  animations: [fadeIn]
})
export class ParquesComponent implements OnInit {
  @Input() nombre: String;
  @Input("metros_cuadrados") metros: number;
  public vegetacion: String;
  public abierto: boolean;

  @Output() pasameLosDatos = new EventEmitter();

  constructor() {
    this.nombre = "Parque natural para caballos";
    this.metros = 450;
    this.vegetacion = "Alta";
    this.abierto = true;
  }

  ngOnInit() {}

  emitirEvento() {
    this.pasameLosDatos.emit({
      nombre: this.nombre,
      metros: this.metros,
      vegetacion: this.vegetacion,
      abierto: this.abierto
    });
  }
}
