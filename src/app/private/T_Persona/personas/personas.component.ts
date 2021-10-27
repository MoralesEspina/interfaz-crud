import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../interface/persona';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  _persona: Persona = {
    id: 0,
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    direccion: '',
  };

  addressForm = this.fb.group({
    nombre: [null, Validators.required],
    apellido: [null, Validators.required],
    fecha_nacimiento: [null, Validators.required],
    direccion: [null, Validators.required],
  });

  hasUnitNumber = false;

  editing: boolean = false;

  constructor(private fb: FormBuilder, private _personaService: PersonaService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario() {
    const id_entrada = this._activatedRoute.snapshot.params.id;

    if (id_entrada) {
      this.editing = true;
      this._personaService.getPersonaIndividual(id_entrada).subscribe(
        res => {
          this._persona = res[0];
          console.log(res[0]);
        },
        err => console.log(err)
      )
    }else{
      this.editing = false;
    }
  }

  crearUsuario() {
    if(this.editing){

      this._personaService.modificarPersona(this._persona.id, this._persona);
      this._router.navigate(['/tb_persona']);
      this._snackBar.open('La Persona Fue Modificada Con Éxito', '',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })

    }else{
    const persona: Persona = {
      id: 0,
      nombre: this.addressForm.value.nombre,
      apellido: this.addressForm.value.apellido,
      fecha_nacimiento: this.addressForm.value.fecha_nacimiento,
      direccion: this.addressForm.value.direccion
    }
    this._personaService.agregarPersona(persona);
    this._router.navigate(["/tb_persona"]);
    this._snackBar.open('La Persona Fue Creada Con Éxito', '',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
  }
}
}
