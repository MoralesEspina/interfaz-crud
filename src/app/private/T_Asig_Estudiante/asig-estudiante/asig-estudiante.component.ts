import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AsigEstudiante } from 'src/app/interface/asigEstudiante';
import { AsigEstudianteService } from 'src/app/services/asigEstudiante';

interface Estado{
  nombre: string;
}

@Component({
  selector: 'app-asig-estudiante',
  templateUrl: './asig-estudiante.component.html',
  styleUrls: ['./asig-estudiante.component.css']
})
export class AsigEstudianteComponent implements OnInit{

  _asigEstudiante:AsigEstudiante ={
    id: 0,
    id_estudiante: 0,
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
    id_estudiante: [null, Validators.required],
    id_curso: [null, Validators.required],
    status: [null, Validators.required],
    fecha_inicio: [null, Validators.required],
    fecha_fin: [null, Validators.required]
  });

  collection = [{'id': this.getCollection}];
  collection1 = [{'id': this.getCollection}];
  editing: boolean = false;

  constructor(private fb: FormBuilder, private _asigEstudianteService: AsigEstudianteService,
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
      .get<any>('https://crud-segundoparcial-dw.herokuapp.com/estudiantes').subscribe((res: any) => {
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
      this._asigEstudianteService.getAsignacionIndividual(id_entrada).subscribe(
        res => {
          this._asigEstudiante = res[0];
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

      this._asigEstudianteService.modificarAsignacion(this._asigEstudiante.id, this._asigEstudiante);
      this._router.navigate(['/tb_asigEstudiante']);
      this._snackBar.open('La Asignación Fue Modificada Con Éxito', '',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })

    }else{
    const estudiante: AsigEstudiante = {
      id: 0,
      id_estudiante: this.addressForm.value.id_estudiante,
      id_curso: this.addressForm.value.id_curso,
      status: this.addressForm.value.status,
      fecha_inicio: this.addressForm.value.fecha_inicio,
      fecha_fin: this.addressForm.value.fecha_fin,
    }
    this._asigEstudianteService.agregarAsignacion(estudiante);
    this._router.navigate(["/tb_asigEstudiante"]);
    this._snackBar.open('La Asignación Fue Creado Con Éxito', '',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
  }
}
}
