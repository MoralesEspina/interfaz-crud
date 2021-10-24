import { Persona } from './../interfaces/persona';
import { TbDocenteItem } from '../tablas/tb-docente/tb-docente-datasource';
import { TbEstudianteItem } from '../tablas/tb-estudiante/tb-estudiante-datasource';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TbPersonaItem } from '../tablas/tb-persona/tb-persona-datasource';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  URL = "https://crud-segundoparcial-dw.herokuapp.com";
  constructor(private httpersona : HttpClient) { }

  getPersona(): Observable<TbPersonaItem[]>{
    return this.httpersona.get<TbPersonaItem[]>(this.URL+'/personas/')
  }

  getPersonaIndividual(id :number): Observable<TbPersonaItem[]>{
    return this.httpersona.get<TbPersonaItem[]>(this.URL+'/personas/'+id)
  }

  deletePersona(id :number){
    this.httpersona.delete(this.URL+'/personas/'+id).subscribe(
      res => console.log(res)
    )
  }
  agregarPersona(persona: {}){
    this.httpersona.post(this.URL+'/personas/', persona).subscribe(
      res => console.log(res)
    )
  }

  modificarPersona(id:number, persona : {}){
    this.httpersona.put(this.URL+'/personas/'+id, persona).subscribe(
      res => console.log(res)
    )
  }

  getEstudiante(): Observable<TbEstudianteItem[]>{
    return this.httpersona.get<TbEstudianteItem[]>(this.URL+'/estudiantes')
  }

  getDocente(): Observable<TbDocenteItem[]>{
    return this.httpersona.get<TbDocenteItem[]>(this.URL+'/maestros')
  }

}
