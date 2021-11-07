import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/interface/curso';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  _curso: Curso = {
    id: 0,
    nombre: '',
    descripcion: ''
  }

  addressForm = this.fb.group({
    nombre: [null, Validators.required],
    descripcion: [null, Validators.required],
  });

  editing: boolean = false;

  constructor(private fb: FormBuilder, private _cursoService: CursoService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.cargarCurso();
  }

  cargarCurso() {
    const id_entrada = this._activatedRoute.snapshot.params.id;

    if (id_entrada) {
      this.editing = true;
      this._cursoService.getCursoIndividual(id_entrada).subscribe(
        res => {
          this._curso = res[0];
          console.log(res[0]);
        },
        err => console.log(err)
      )
    } else {
      this.editing = false;
    }
  }

  crearCurso() {
    if (this.editing) {

      this._cursoService.modificarCurso(this._curso.id, this._curso);
      this._router.navigate(['/tb_curso']);
      this._snackBar.open('El Curso Fue Modificado Con Éxito', '',
        {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })

    } else {
      const curso: Curso = {
        id: 0,
        nombre: this.addressForm.value.nombre,
        descripcion: this.addressForm.value.descripcion,
      }
      this._cursoService.agregarCurso(curso);
      this._router.navigate(["/tb_curso"]);
      this._snackBar.open('El Curso Fue Creado Con Éxito', '',
        {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
    }
  }
}
