import { Component, OnInit, DoCheck } from "@angular/core";

@Component({
  selector: "guardar-email",
  templateUrl: "./guardar-email.component.html",
  styleUrls: ["./guardar-email.component.css"]
})
export class GuardarEmailComponent implements OnInit {
  title: String = 'Guardar Email';
  emailContacto;

  constructor() {}

  ngOnInit() {}

  guardarEmail() {
    localStorage.setItem("emailContacto", this.emailContacto.toString());
  }
}
