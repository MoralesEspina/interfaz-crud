import { DocenteService } from '../../../services/docente.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Docente } from 'src/app/interface/docente';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  _docente: Docente ={
    id: 0,
    idpersona: 0,
    nombre: '',
    apellido: '',
    fecha_ingreso: ''
  }



  addressForm = this.fb.group({
    idpersona: [null, Validators.required],
    fecha_ingreso: [null, Validators.required],
  });


  editing: boolean = false;

  collection = [{'id': this.getCollection}];

  constructor(private fb: FormBuilder, private _docenteService: DocenteService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private http:HttpClient) {

  }
  ngOnInit(): void {
    this.cargarDocente();
    this.getCollection();
  }

  getCollection() {
    this.http
      .get<any>('https://crud-segundoparcial-dw.herokuapp.com/personas').subscribe((res: any) => {
        this.collection = res;
      }, error => {
        console.log({ error });
      })
  }
  cargarDocente() {
    const id_entrada = this._activatedRoute.snapshot.params.id;

    if (id_entrada) {
      this.editing = true;
      this._docenteService.getDocenteIndividual(id_entrada).subscribe(
        res => {
          this._docente = res[0];
          console.log(res[0]);
        },
        err => console.log(err)
      )
    }else{
      this.editing = false;
    }
  }

  crearDocente() {
    if(this.editing){

      this._docenteService.modificarDocente(this._docente.id, this._docente);
      this._router.navigate(['/tb_docente']);
      this._snackBar.open('El Docente Fue Modificado Con Éxito', '',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })

    }else{
    const docente: Docente = {
      id: 0,
      nombre: '',
      apellido: '',
      idpersona: this.addressForm.value.idpersona,
      fecha_ingreso: this.addressForm.value.fecha_ingreso,
    }
    this._docenteService.agregarDocente(docente);
    this._router.navigate(["/tb_docente"]);
    this._snackBar.open('El Docente Fue Creado Con Éxito', '',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
  }
}
}
