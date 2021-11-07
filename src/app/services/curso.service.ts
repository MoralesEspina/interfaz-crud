import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../interface/curso';


@Injectable({
  providedIn: 'root'
})
export class CursoService {

  URL = "https://crud-segundoparcial-dw.herokuapp.com";
  constructor(private http : HttpClient) { }

  getCurso(): Observable<Curso[]>{
    return this.http.get<Curso[]>(this.URL+'/curso')
  }

  getCursoIndividual(id :number): Observable<Curso[]>{
    return this.http.get<Curso[]>(this.URL+'/curso/'+id)
  }

  deleteCurso(id :number){
    this.http.delete(this.URL+'/curso/'+id).subscribe(
      res => console.log(res)
    )
  }

  agregarCurso(curso: {}){
    this.http.post(this.URL+'/curso/', curso).subscribe(
      res => console.log(res)
    )
  }

  modificarCurso(id:number, curso : {}){
    this.http.put(this.URL+'/curso/'+id, curso).subscribe(
      res => console.log(res)
    )
  }
}
