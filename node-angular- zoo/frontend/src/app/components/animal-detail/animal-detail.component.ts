import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { GLOBAL } from '../../services/global';
import { AnimalService } from 'src/app/services/animal.service';
import { Animal } from 'src/app/models/animal';



@Component({
  selector: 'animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {
  public animal: Animal;
  public url: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animalService: AnimalService
  ) { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('Componente animal detail cargado');
    this.getAnimal();
  }

  getAnimal(){
    this.route.params.forEach((params: Params)=>{
      let id = params['id'];
      this.animalService.getAnimal(id).subscribe(
        response=>{
          if(!response['animal']){
            this.router.navigate(['/']);
          }else{
            this.animal = response['animal']
            console.log(this.animal);
          }
        },
        error=>{
          console.log(error);
          this.router.navigate(['/']);
        }
      )
    })
  }

}
