import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent {
  addressForm = this.fb.group({

    nombre: [null, Validators.required],
    apellido: [null, Validators.required],
    fechanac: [null, Validators.required],
    direccion: [null, Validators.required],

  });

  hasUnitNumber = false;

  nombre:string | undefined;
  apellido:string | undefined;
  fechanac: Date | undefined;
  direccion: string | undefined;

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    alert('Thanks!');
  }
}
