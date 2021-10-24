import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent {
  addressForm = this.fb.group({
    idpersona: [null, Validators.required],
    fecha_ingreso: [null, Validators.required],

    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;
  id_persona: number;
  fecha_ingreso: Date;



  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    alert('Thanks!');
  }
}
