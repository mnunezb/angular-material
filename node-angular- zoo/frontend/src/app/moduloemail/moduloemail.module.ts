//Importar modulos necesarios para crear modulos
import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Importar componentes
import { GuardarEmailComponent }  from './components/guardar-email/guardar-email.component';
import { MostrarEmailComponent }  from './components/mostrar-email/mostrar-email.component';
import { MainEmailComponent }  from './components/main-email/main-email.component';

//Decorador NgModule para cat¿rgar componentes y configuración de modulos
@NgModule({
    imports: [CommonModule, FormsModule, BrowserAnimationsModule],
    declarations: [
        GuardarEmailComponent,
        MostrarEmailComponent,
        MainEmailComponent
    ],
    exports: [MainEmailComponent]
})

export class ModuloEmailModule {}