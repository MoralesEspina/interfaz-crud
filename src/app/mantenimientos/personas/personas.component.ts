import { PersonaService } from './../../services/persona.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent {
  addressForm = this.fb.group({

    nombre: [null, Validators.required],
    apellido: [null, Validators.required],
    fecha_nacimiento: [null, Validators.required],
    direccion: [null, Validators.required],

  });

  hasUnitNumber = false;

  nombre:string;
  apellido:string;
  fecha_nacimiento: string;
  direccion: string;

  constructor(private fb: FormBuilder, private _personaService: PersonaService, private _snackBar: MatSnackBar, private _router: Router) {}

  crearUsuario() {
    const persona = {
      nombre: this.nombre,
      apellido: this.apellido,
      fecha_nacimiento: this.fecha_nacimiento,
      direccion: this.direccion
    }
      this._personaService.agregarPersona(persona);
      this._router.navigate(["/tb_persona"]);
      this._snackBar.open('La Persona Fue Creada Con Éxito','',
    {
      duration:2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
