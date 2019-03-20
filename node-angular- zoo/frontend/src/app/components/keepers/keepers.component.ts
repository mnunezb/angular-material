import { Component, OnInit } from "@angular/core";
import { fadeIn } from "../animations";
import { User } from "src/app/models/user";
import { UserService } from "../../services/user.service";
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: "keepers",
  templateUrl: "./keepers.component.html",
  styleUrls: ["./keepers.component.css"],
  animations: [fadeIn]
})
export class KeepersComponent implements OnInit {
  public title: string;
  public keepers: User[];
  public url:string;

  constructor(private userService: UserService) {
    this.title = "Cuidadores";
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("Keepers cargado");
    this.getAnimals();
  }

  getAnimals() {
    this.userService.getKeepers().subscribe(
      response => {
        // console.log(response['animals']);
        this.keepers = response["users"];
        console.log(this.keepers);
      },
      error => {
        console.log(error);
      }
    );
  }
}
