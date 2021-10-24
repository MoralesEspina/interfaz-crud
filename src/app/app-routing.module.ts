import { EstudianteComponent } from './mantenimientos/estudiante/estudiante.component';
import { DocenteComponent } from './mantenimientos/docente/docente.component';
import { TbPersonaComponent } from './tablas/tb-persona/tb-persona.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasComponent } from './mantenimientos/personas/personas.component';
import { TbDocenteComponent } from './tablas/tb-docente/tb-docente.component';
import { TbEstudianteComponent } from './tablas/tb-estudiante/tb-estudiante.component';

export const routes: Routes = [
  { path: 'tb_docente', component: TbDocenteComponent },
  { path: 'tb_persona', component: TbPersonaComponent },
  { path: 'tb_estudiante', component: TbEstudianteComponent },
  { path: 'persona', component: PersonasComponent },
  { path: 'docente', component: DocenteComponent },
  { path: 'estudiante', component: EstudianteComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
