import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent {
  addressForm = this.fb.group({
    idpersona: [null, Validators.required],
    fecha_ingreso: [null, Validators.required],
    carnet: [null, Validators.required],
    status: [null, Validators.required]

  });

  hasUnitNumber = false;
  id_persona: number;
  fecha_ingreso: Date;
  carnet: string;
  status: string;



  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    alert('Thanks!');
  }
}
