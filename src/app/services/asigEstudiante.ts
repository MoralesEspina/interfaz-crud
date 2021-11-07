import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsigEstudiante } from '../interface/asigEstudiante';
import { Curso } from '../interface/curso';


@Injectable({
  providedIn: 'root'
})
export class AsigEstudianteService {

  URL = "https://crud-segundoparcial-dw.herokuapp.com";
  constructor(private http : HttpClient) { }

  getAsignacion(): Observable<AsigEstudiante[]>{
    return this.http.get<AsigEstudiante[]>(this.URL+'/estudiantes_curso')
  }

  getAsignacionIndividual(id :number): Observable<AsigEstudiante[]>{
    return this.http.get<AsigEstudiante[]>(this.URL+'/estudiantes_curso/'+id)
  }

  deleteAsignacion(id :number){
    this.http.delete(this.URL+'/estudiantes_curso/'+id).subscribe(
      res => console.log(res)
    )
  }

  agregarAsignacion(asigEstudiante: {}){
    this.http.post(this.URL+'/estudiantes_curso/', asigEstudiante).subscribe(
      res => console.log(res)
    )
  }

  modificarAsignacion(id:number, asigEstudiante : {}){
    this.http.put(this.URL+'/estudiantes_curso/'+id, asigEstudiante).subscribe(
      res => console.log(res)
    )
  }
}
