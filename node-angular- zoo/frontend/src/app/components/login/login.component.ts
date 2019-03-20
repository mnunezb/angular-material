import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public title: String;
  public user: User;
  public identity: User;
  public token: String;
  public status: String;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private userService: UserService
  ) {
    this.title = "Identificate";
    this.user = new User("", "", "", "", "", "ROLE_USER", "");
  }

  ngOnInit() {
    console.log("register.component cargado!");
    console.log(this.userService.getIdentity());
    console.log(this.userService.getToken());
  }

  onSubmit() {
    // conseguir el objeto
    this.userService.signUp(this.user).subscribe(
      response => {
        this.identity = response["user"];
        if (!this.identity || !this.identity._id) {
          console.log("El usuario no se ha logeado correctamente");
        } else {
          this.identity.password = "";
          localStorage.setItem("identity", JSON.stringify(this.identity));
          // conseguir el token
          this.userService.signUp(this.user, true).subscribe(
            response => {
              // console.log('token');
              this.token = response["token"];
              if (this.token.length < 0) {
                console.log("El token no se ha generado");
              } else {
                // mostrar tokrn
                localStorage.setItem("token", this.token.toString());
                this.status = "success";
                this._router.navigate(["/"]);
              }
              // console.log(response['token']);
              // this.token = res
              // if(!this.identity || !this.identity._id){
              //   console.log('El usuario no se ha logeado correctamente');
              // }else{

              // }
            },
            error => {
              console.log(error.message);
            }
          );
        }
      },
      error => {
        var errorMessage = error.message;
        if (errorMessage != null) {
          // var body = JSON.parse(errorMessage)
          this.status = "error";
        }
      }
    );
  }
}
