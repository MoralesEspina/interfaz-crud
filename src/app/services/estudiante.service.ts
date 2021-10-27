import { TbEstudianteItem } from '../private/T_Estudiante/tb-estudiante/tb-estudiante-datasource';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  URL = "https://crud-segundoparcial-dw.herokuapp.com";
  constructor(private http : HttpClient) { }

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
}
