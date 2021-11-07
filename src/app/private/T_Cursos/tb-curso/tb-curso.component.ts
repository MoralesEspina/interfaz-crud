import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Curso } from 'src/app/interface/curso';
import { CursoService } from 'src/app/services/curso.service';
import { TbCursoDataSource } from './tb-curso-datasource';

@Component({
  selector: 'app-tb-curso',
  templateUrl: './tb-curso.component.html',
  styleUrls: ['./tb-curso.component.css']
})
export class TbCursoComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Curso>;
  dataSource: TbCursoDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'descripcion', 'acciones'];

  constructor(private _cursoService: CursoService,
    private _snackBar: MatSnackBar,
    private _router : Router) {
    this.dataSource = new TbCursoDataSource();
  }

  ngOnInit() {
    this.dataSource = new TbCursoDataSource();
    this._cursoService.getCurso().subscribe(
      res =>{
        console.log(res);
        this.dataSource.data = res;
      }
    );
  }

  eliminarCurso(id:number){
    this._cursoService.deleteCurso(id);

    this._snackBar.open('El Curso Fue Eliminado Con Éxito','',
    {
      duration:2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
    setTimeout(location.reload.bind(location), 500);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
