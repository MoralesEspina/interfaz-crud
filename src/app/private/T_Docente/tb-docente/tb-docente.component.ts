import { DocenteService } from '../../../services/docente.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { TbDocenteDataSource, TbDocenteItem } from './tb-docente-datasource';

@Component({
  selector: 'app-tb-docente',
  templateUrl: './tb-docente.component.html',
  styleUrls: ['./tb-docente.component.css']
})
export class TbDocenteComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TbDocenteItem>;
  dataSource: TbDocenteDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'idpersona', 'fecha_ingreso', 'acciones'];

  constructor(private _docenteService: DocenteService, private _snackBar: MatSnackBar, private _router : Router) {

  }

  ngOnInit() {
    this.dataSource = new TbDocenteDataSource();
    this._docenteService.getDocente().subscribe(
      res =>{
        console.log(res);
        this.dataSource.data = res;
      }
    );
  }

  eliminarDocente(id:number){
    this._docenteService.deleteDocente(id);

    this._snackBar.open('El Docente Fue Eliminado Con Éxito','',
    {
      duration:2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
    setTimeout(location.reload.bind(location), 500);
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
