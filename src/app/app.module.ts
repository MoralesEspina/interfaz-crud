import { InterceptorService } from './services/interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav_bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PersonasComponent } from './private/T_Persona/personas/personas.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EstudianteComponent } from './private/T_Estudiante/estudiante/estudiante.component';
import { DocenteComponent } from './private/T_Docente/docente/docente.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TbPersonaComponent } from './private/T_Persona/tb-persona/tb-persona.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TbEstudianteComponent } from './private/T_Estudiante/tb-estudiante/tb-estudiante.component';
import { TbDocenteComponent } from './private/T_Docente/tb-docente/tb-docente.component';
import { RouterModule} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginComponent } from './public/login/login.component';
import { AuthGuard } from './auth.guard';
import { CursoComponent } from './private/T_Cursos/curso/curso.component';
import { TbCursoComponent } from './private/T_Cursos/tb-curso/tb-curso.component';
import { AsigEstudianteComponent } from './private/T_Asig_Estudiante/asig-estudiante/asig-estudiante.component';
import { TbAsigEstudianteComponent } from './private/T_Asig_Estudiante/tb-asig-estudiante/tb-asig-estudiante.component';





@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PersonasComponent,
    EstudianteComponent,
    DocenteComponent,
    PersonasComponent,
    TbPersonaComponent,
    TbEstudianteComponent,
    TbDocenteComponent,
    LoginComponent,
    CursoComponent,
    TbCursoComponent,
    AsigEstudianteComponent,
    TbAsigEstudianteComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
