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
  id_persona: number | undefined;
  fecha_ingreso: Date | undefined;
  carnet: string | undefined;
  status: string | undefined;



  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    alert('Thanks!');
  }
}
