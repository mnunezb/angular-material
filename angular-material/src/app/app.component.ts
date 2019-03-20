import { Component, OnInit } from "@angular/core";
import { PhotosService } from "./services/photos.service";
import { Photo } from "./models/photos";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  albumsId = [1, 2, 3];
}
