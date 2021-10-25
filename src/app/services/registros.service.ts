import { Persona } from '../interfaces/persona';
import { TbDocenteItem } from '../tablas/tb-docente/tb-docente-datasource';
import { TbEstudianteItem } from '../tablas/tb-estudiante/tb-estudiante-datasource';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TbPersonaItem } from '../tablas/tb-persona/tb-persona-datasource';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  URL = "https://crud-segundoparcial-dw.herokuapp.com";
  constructor(private http : HttpClient) { }

  getPersona(): Observable<TbPersonaItem[]>{
    return this.http.get<TbPersonaItem[]>(this.URL+'/personas/')
  }

  getPersonaIndividual(id :number): Observable<TbPersonaItem[]>{
    return this.http.get<TbPersonaItem[]>(this.URL+'/personas/'+id)
  }

  deletePersona(id :number){
    this.http.delete(this.URL+'/personas/'+id).subscribe(
      res => console.log(res)
    )
  }
  agregarPersona(persona: {}){
    this.http.post(this.URL+'/personas/', persona).subscribe(
      res => console.log(res)
    )
  }

  modificarPersona(id:number, persona : {}){
    this.http.put(this.URL+'/personas/'+id, persona).subscribe(
      res => console.log(res)
    )
  }

  getEstudiante(): Observable<TbEstudianteItem[]>{
    return this.http.get<TbEstudianteItem[]>(this.URL+'/estudiantes')
  }

  getEstudianteIndividual(id :number): Observable<TbEstudianteItem[]>{
    return this.http.get<TbEstudianteItem[]>(this.URL+'/estudiantes/'+id)
  }

  deleteEstudiante(id :number){
    this.http.delete(this.URL+'/estudiantes/'+id).subscribe(
      res => console.log(res)
    )
  }
  agregarEstudiante(persona: {}){
    this.http.post(this.URL+'/estudiantes/', persona).subscribe(
      res => console.log(res)
    )
  }

  modificarEstudiante(id:number, persona : {}){
    this.http.put(this.URL+'/estudiantes/'+id, persona).subscribe(
      res => console.log(res)
    )
  }
  getDocente(): Observable<TbDocenteItem[]>{
    return this.http.get<TbDocenteItem[]>(this.URL+'/maestros')
  }

  getDocenteIndividual(id :number): Observable<TbDocenteItem[]>{
    return this.http.get<TbDocenteItem[]>(this.URL+'/maestros/'+id)
  }

  deleteDocente(id :number){
    this.http.delete(this.URL+'/maestros/'+id).subscribe(
      res => console.log(res)
    )
  }
  agregarDocente(persona: {}){
    this.http.post(this.URL+'/maestros/', persona).subscribe(
      res => console.log(res)
    )
  }

  modificarDocente(id:number, persona : {}){
    this.http.put(this.URL+'/maestros/'+id, persona).subscribe(
      res => console.log(res)
    )
  }
}
