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
import { CursoComponent } from './private/T_Cursos/curso/curso.component';
import { TbCursoComponent } from './private/T_Cursos/tb-curso/tb-curso.component';
import { TbAsigEstudianteComponent } from './private/T_Asig_Estudiante/tb-asig-estudiante/tb-asig-estudiante.component';
import { AsigEstudianteComponent } from './private/T_Asig_Estudiante/asig-estudiante/asig-estudiante.component';
import { TbAsigDocenteComponent } from './private/T_Asig_Docente/tb-asig-docente/tb-asig-docente.component';
import { AsigDocenteComponent } from './private/T_Asig_Docente/asig-docente/asig-docente.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  //Tablas
  { path: 'tb_docente', component: TbDocenteComponent, canActivate:[AuthGuard] },
  { path: 'tb_persona', component: TbPersonaComponent, canActivate:[AuthGuard] },
  { path: 'tb_estudiante', component: TbEstudianteComponent, canActivate:[AuthGuard] },
  { path: 'tb_curso', component: TbCursoComponent, canActivate:[AuthGuard]},
  { path: 'tb_asigEstudiante', component: TbAsigEstudianteComponent, canActivate:[AuthGuard]},
  { path: 'tb_asigDocente', component: TbAsigDocenteComponent, canActivate:[AuthGuard]},
  // Ingreso de Datos
  { path: 'persona', component: PersonasComponent, canActivate:[AuthGuard] },
  { path: 'docente', component: DocenteComponent, canActivate:[AuthGuard] },
  { path: 'estudiante', component: EstudianteComponent, canActivate:[AuthGuard] },
  { path: 'curso', component: CursoComponent, canActivate:[AuthGuard] },
  { path: 'asigEstudiante', component: AsigEstudianteComponent, canActivate:[AuthGuard] },
  { path: 'asigDocente', component: AsigDocenteComponent, canActivate:[AuthGuard] },
  // Modificacion de Datos
  { path: 'persona/:id', component: PersonasComponent, canActivate:[AuthGuard] },
  { path: 'docente/:id', component: DocenteComponent, canActivate:[AuthGuard] },
  { path: 'estudiante/:id', component: EstudianteComponent, canActivate:[AuthGuard]},
  { path: 'curso/:id', component: CursoComponent, canActivate:[AuthGuard]},
  { path: 'asigEstudiante/:id', component: AsigEstudianteComponent, canActivate:[AuthGuard] },
  { path: 'asigDocente/:id', component: AsigDocenteComponent, canActivate:[AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
