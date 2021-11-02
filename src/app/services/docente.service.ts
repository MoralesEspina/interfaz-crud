
import { TbDocenteItem } from '../private/T_Docente/tb-docente/tb-docente-datasource';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  URL = "https://crud-segundoparcial-dw.herokuapp.com";
  constructor(private http : HttpClient) { }

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
