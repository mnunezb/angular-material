import { Component, OnInit } from "@angular/core";
import { AnimalService } from 'src/app/services/animal.service';
import { UserService } from 'src/app/services/user.service';
import { Animal } from '../../../models/animal';
import { Router } from '@angular/router';
import { FadeLateral } from '../../animations';

@Component({
  selector: "admin-list",
  templateUrl: "./list.component.html",
  styles: [".btn-sm{margin-right: 5px;}"],
  animations: [FadeLateral]
})
export class ListComponent implements OnInit {
  title = "Listado";
  animals: Animal[];
  token;
  identity;
  public busqueda:String;


  constructor(private animalService: AnimalService, private userService: UserService, private router: Router) {
    this.token = this.userService.getToken();
    this.identity = this.userService.getIdentity();
  }

  ngOnInit() {
    this.getAnimals();
  }

  animalDetail(id){
    this.router.navigate(['animal',id])
    console.log(id);
  }

  getAnimals(){
    this.animalService.getAnimals().subscribe(
      response=>{
        // console.log(response['animals']); 
        this.animals = response['animals'];
        console.log(this.animals);
      },
      error=>{
        console.log(error);
      }
    )
  }

  deleteAnimal(id){
    this.animalService.deleteAnimal(this.token, id).subscribe(
      response=>{
        console.log(response);
        this.getAnimals();
      },
      error=>{
        console.log(error);
      }
    )
  }

}
