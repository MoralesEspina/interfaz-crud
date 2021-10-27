import { EstudianteService } from '../../../services/estudiante.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/interface/estudiante';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  _estudiante:Estudiante ={
    id: 0,
    idpersona: 0,
    fecha_ingreso: '',
    carnet: '',
    status: ''
  };


  addressForm = this.fb.group({
    idpersona: [null, Validators.required],
    fecha_ingreso: [null, Validators.required],
    carnet: [null, Validators.required],
    status: [null, Validators.required]

  });


  hasUnitNumber = false;

  editing: boolean = false;

  constructor(private fb: FormBuilder, private _estudianteService: EstudianteService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.cargarEstudiante();
  }

  cargarEstudiante() {
    const id_entrada = this._activatedRoute.snapshot.params.id;
    if (id_entrada) {
      this.editing = true;
      this._estudianteService.getEstudianteIndividual(id_entrada).subscribe(
        res => {
          this._estudiante = res[0];
          console.log(res[0]);
        },
        err => console.log(err)
      )
    }else{
      this.editing = false;
    }
  }

  crearEstudiante() {
    if(this.editing){

      this._estudianteService.modificarEstudiante(this._estudiante.id, this._estudiante);
      this._router.navigate(['/tb_estudiante']);
      this._snackBar.open('La Persona Fue Modificada Con Éxito', '',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })

    }else{
    const estudiante: Estudiante = {
      id: 0,
      idpersona: this.addressForm.value.idpersona,
      fecha_ingreso: this.addressForm.value.fecha_ingreso,
      carnet: this.addressForm.value.carnet,
      status: this.addressForm.value.status,
    }
    this._estudianteService.agregarEstudiante(estudiante);
    this._router.navigate(["/tb_estudiante"]);
    this._snackBar.open('El Estudiante Fue Creado Con Éxito', '',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
  }
}
}
