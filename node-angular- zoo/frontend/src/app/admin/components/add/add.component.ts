import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Animal } from "src/app/models/animal";
import { AnimalService } from "../../../services/animal.service";
import { GLOBAL } from "../../../services/global";
import { UserService } from "src/app/services/user.service";
import { UploadService } from "src/app/services/upload.service";
import { FadeLateral } from '../../animations';

@Component({
  selector: "admin-add",
  templateUrl: "./add.component.html",
  animations:[FadeLateral]
})
export class AddComponent implements OnInit {
  public title = "Add";
  public animal: Animal;
  public identity;
  public token;
  public url: string;
  public status;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animalService: AnimalService,
    private userService: UserService,
    private uploadService: UploadService
  ) {
    this.url = GLOBAL.url;
    this.animal = new Animal("","", "", 2019, "", "");
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit() {
    console.log("Componente add cargado");
  }

  onSubmit() {
    console.log(this.animal);
    this.animalService
      .addAnimal(this.token, this.animal)
      .subscribe(response => {
        if(!response['animal']){
          console.log('errr');
          console.log(response);
        }else{
          this.status = 'success'
          this.animal = response['animal'];

          //Subir imagen del animal
          if(!this.filesToUpload){
          this.router.navigate(['/admin-panel/listado']);
        }else{
          this.uploadService.makeFileRequest(this.url+'/upload-image-animal/'+this.animal._id, [],this.filesToUpload,this.token, 'image')
          .then((result: any)=>{
            this.animal.image = result['image'];
            console.log(this.animal);
            this.router.navigate(['/admin-panel/listado']);
          });
          }
        }
      }, error => {
        this.status = 'error'
      });
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files
    console.log(this.filesToUpload);
  }
}
