//Modulos
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminGuard } from "../services/admin.guard";
import { AnimalService } from "../services/animal.service";
import { UploadService } from "../services/upload.service";
import { UserService } from "../services/user.service";
import { SearchPipe } from "./pipes/search.pipe";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// componentes
import { MainComponent } from "./components/main/main.component";
import { AddComponent } from "./components/add/add.component";
import { EditComponent } from "./components/edit/edit.component";
import { ListComponent } from "./components/list/list.component";
import { from } from "rxjs";

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AdminRoutingModule,
    BrowserAnimationsModule
  ],
  exports: [MainComponent, ListComponent, AddComponent, EditComponent],
  providers: [AdminGuard, AnimalService, UploadService, UserService]
})
export class AdminModule {}
