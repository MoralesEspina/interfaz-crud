import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AsigDocente } from 'src/app/interface/asigDocente';
import { AsigDocenteService } from 'src/app/services/asigDocente';

interface Estado{
  nombre: string;
}

@Component({
  selector: 'app-asig-docente',
  templateUrl: './asig-docente.component.html',
  styleUrls: ['./asig-docente.component.css']
})
export class AsigDocenteComponent implements OnInit {

  _asigDocente:AsigDocente ={
    id: 0,
    id_docente: 0,
    id_curso: 0,
    status: '',
    fecha_inicio: '',
    fecha_fin: '',
  };

  _estado: Estado[] = [
    {nombre: 'Activo'},
    {nombre: 'Inactivo'},
  ];

  addressForm = this.fb.group({
    id: [null, Validators.required],
    id_docente: [null, Validators.required],
    id_curso: [null, Validators.required],
    status: [null, Validators.required],
    fecha_inicio: [null, Validators.required],
    fecha_fin: [null, Validators.required]
  });

  editing: boolean = false;

  collection = [{'id': this.getCollection}];
  collection1 = [{'id': this.getCollection}];

  constructor(private fb: FormBuilder, private _asigDocenteService: AsigDocenteService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private http:HttpClient) {}

 ngOnInit(): void {
    this.cargarAsignación();
    this.getCollection();
  }

  getCollection() {
    this.http
      .get<any>('https://crud-segundoparcial-dw.herokuapp.com/maestros').subscribe((res: any) => {
        this.collection = res;
      }, error => {
        console.log({ error });
      })
      this.http
      .get<any>('https://crud-segundoparcial-dw.herokuapp.com/curso').subscribe((res: any) => {
        this.collection1 = res;
      }, error => {
        console.log({ error });
      })
  }

  cargarAsignación() {
    const id_entrada = this._activatedRoute.snapshot.params.id;
    if (id_entrada) {
      this.editing = true;
      this._asigDocenteService.getAsignacionIndividual(id_entrada).subscribe(
        res => {
          this._asigDocente = res[0];
          console.log(res[0]);
        },
        err => console.log(err)
      )
    }else{
      this.editing = false;
    }
  }

  onCrearAsignacion() {
    if(this.editing){

      this._asigDocenteService.modificarAsignacion(this._asigDocente.id, this._asigDocente);
      this._router.navigate(['/tb_asigDocente']);
      this._snackBar.open('La Asignación Fue Modificada Con Éxito', '',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })

    }else{
    const estudiante: AsigDocente = {
      id: 0,
      id_docente: this.addressForm.value.id_docente,
      id_curso: this.addressForm.value.id_curso,
      status: this.addressForm.value.status,
      fecha_inicio: this.addressForm.value.fecha_inicio,
      fecha_fin: this.addressForm.value.fecha_fin,
    }
    this._asigDocenteService.agregarAsignacion(estudiante);
    this._router.navigate(["/tb_asigDocente"]);
    this._snackBar.open('La Asignación Fue Creado Con Éxito', '',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
  }
}
}
