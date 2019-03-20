import { Component, OnInit } from "@angular/core";
import { fadeIn } from "../animations";
import { AnimalService } from "src/app/services/animal.service";
import { Animal } from 'src/app/models/animal';
import { GLOBAL } from 'src/app/services/global';


@Component({
  selector: "app-animals",
  templateUrl: "./animals.component.html",
  styleUrls: ["./animals.component.css"],
  animations: [fadeIn]
})
export class AnimalsComponent implements OnInit {
  public title:string;
  public animals: Animal[];
  public url:String;

  constructor(private animalService: AnimalService) {
    this.title = "Animals"
    this.getAnimals();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("Animals cargado");
  }

  getAnimals() {
    this.animalService.getAnimals().subscribe(
      response => {
        // console.log(response['animals']);
        this.animals = response["animals"];
        console.log(this.animals);
      },
      error => {
        console.log(error);
      }
    );
  }
}
