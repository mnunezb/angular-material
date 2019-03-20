import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { GLOBAL } from "../../services/global";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  title: String;
  public user: User;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = "Register";
    // this.status = '';
    this.user = new User("", "", "", "", "", "ROLE_USER", "");
  }

  ngOnInit() {
    console.log("register.component cargado!");
    // console.log(this._userService.register());
  }
  onSubmit(registerForm) {
    this._userService.register(this.user).subscribe(
      (response) =>{
        if(response['message']._id){
          // this.message = 'El registro se ha realizado correctamente, Identificate con  '+this.user.email;
          this.status = 'success';
          console.log(response['message']);
          // this.user = new User("", "", "", "", "", "ROLE_USER", "");
          registerForm.reset();
        }else{
          // this.message = 'Error al registrarme';
          console.log(response['message']);
          this.status = 'error';
        }
      },
      error=>{
        console.log(error);
        this.status = 'error';
        // this.message = 'El usuario no se pudo registrar, por favor intente más tarde'
      }
    )
  }
}
