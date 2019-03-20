import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { GLOBAL } from "../../services/global";
import { UserService } from "src/app/services/user.service";
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: "user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"]
})
export class UserEditComponent implements OnInit {
  public title: string;
  public user: User;
  public identity;
  public token;
  public status;
  public url: string;

  constructor(private userService: UserService, private uploadService: UploadService) {
    this.title = "Actualizar mis datos";
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("user-edit.component.ts cargado!!");
  }
  onSubmit(){
    this.userService.updateUser(this.user).subscribe(
      response=>{
        if(!response['user']){
          this.status = 'error';
        }else{
          localStorage.setItem('identity', JSON.stringify(this.user))
          console.log(response);
          this.status = 'success'

          //subida de imagen
          this.uploadService.makeFileRequest(this.url+'/upload-image-user/'+this.user._id, [],this.filesToUpload,this.token, 'image')
          .then((result: any)=>{
            this.user.image = result['image'];
            localStorage.setItem('identity', JSON.stringify(this.user));
            console.log(this.user);
          })

        }

      }
    ),
    error=>{
      if(!error){
        this.status = 'error'
        console.log(error);
      }
    }
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files
    console.log(this.filesToUpload);
  }
}
