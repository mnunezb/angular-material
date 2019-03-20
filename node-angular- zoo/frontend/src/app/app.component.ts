import { Component, OnInit, DoCheck } from "@angular/core";
import { UserService } from "./services/user.service";
import { Route, Router } from "@angular/router";
import { GLOBAL } from "./services/global";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public identity;
  emailContacto: String;
  public url:string;

  constructor(private userService: UserService, private router: Router) {
    this.title = "NGZoo";
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this.userService.getIdentity();
  }

  ngDoCheck() {
    this.identity = this.userService.getIdentity();
  }
  logout() {
    localStorage.clear();
    this.identity = null;
    this.router.navigate(["/"]);
  }
}
