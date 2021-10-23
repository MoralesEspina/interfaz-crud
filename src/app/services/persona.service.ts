import { TbDocenteItem } from './../tb-docente/tb-docente-datasource';
import { TbEstudianteItem } from './../tb-estudiante/tb-estudiante-datasource';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TbPersonaItem } from '../tb-persona/tb-persona-datasource';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  URL = "https://crud-segundoparcial-dw.herokuapp.com/personas";
  URL2 = "https://crud-segundoparcial-dw.herokuapp.com/estudiantes";
  URL3 = "https://crud-segundoparcial-dw.herokuapp.com/maestros";
  constructor(private httpersona : HttpClient) { }

  getPersona(): Observable<TbPersonaItem[]>{
    return this.httpersona.get<TbPersonaItem[]>(this.URL)
  }

  getEstudiante(): Observable<TbEstudianteItem[]>{
    return this.httpersona.get<TbEstudianteItem[]>(this.URL2)
  }

  getDocente(): Observable<TbDocenteItem[]>{
    return this.httpersona.get<TbDocenteItem[]>(this.URL3)
  }

}
