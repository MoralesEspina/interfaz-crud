import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TbPersonaItem } from '../private/T_Persona/tb-persona/tb-persona-datasource';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

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
}
