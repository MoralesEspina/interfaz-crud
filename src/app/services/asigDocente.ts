import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsigDocente } from '../interface/asigDocente';



@Injectable({
  providedIn: 'root'
})
export class AsigDocenteService {

  URL = "https://crud-segundoparcial-dw.herokuapp.com";
  constructor(private http : HttpClient) { }

  getAsignacion(): Observable<AsigDocente[]>{
    return this.http.get<AsigDocente[]>(this.URL+'/docente-curso')
  }

  getAsignacionIndividual(id :number): Observable<AsigDocente[]>{
    return this.http.get<AsigDocente[]>(this.URL+'/docente-curso/'+id)
  }

  deleteAsignacion(id :number){
    this.http.delete(this.URL+'/docente-curso/'+id).subscribe(
      res => console.log(res)
    )
  }

  agregarAsignacion(asigDocente: {}){
    this.http.post(this.URL+'/docente-curso/', asigDocente).subscribe(
      res => console.log(res)
    )
  }

  modificarAsignacion(id:number, asigDocente : {}){
    this.http.put(this.URL+'/docente-curso/'+id, asigDocente).subscribe(
      res => console.log(res)
    )
  }
}
