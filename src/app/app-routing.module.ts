import { EstudianteComponent } from './private/T_Estudiante/estudiante/estudiante.component';
import { DocenteComponent } from './private/T_Docente/docente/docente.component';
import { TbPersonaComponent } from './private/T_Persona/tb-persona/tb-persona.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasComponent } from './private/T_Persona/personas/personas.component';
import { TbDocenteComponent } from './private/T_Docente/tb-docente/tb-docente.component';
import { TbEstudianteComponent } from './private/T_Estudiante/tb-estudiante/tb-estudiante.component';
import { LoginComponent } from './public/login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tb_docente', component: TbDocenteComponent, canActivate:[AuthGuard] },
  { path: 'tb_persona', component: TbPersonaComponent, canActivate:[AuthGuard] },
  { path: 'tb_estudiante', component: TbEstudianteComponent, canActivate:[AuthGuard] },
  { path: 'persona', component: PersonasComponent, canActivate:[AuthGuard] },
  { path: 'docente', component: DocenteComponent, canActivate:[AuthGuard] },
  { path: 'estudiante', component: EstudianteComponent, canActivate:[AuthGuard] },
  { path: 'persona/:id', component: PersonasComponent, canActivate:[AuthGuard] },
  { path: 'docente/:id', component: DocenteComponent, canActivate:[AuthGuard] },
  { path: 'estudiante/:id', component: EstudianteComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
