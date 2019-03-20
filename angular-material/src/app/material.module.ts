import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatSelectModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, materialModules],
  exports: [MatButtonModule, materialModules]
})
export class MaterialModule {}
