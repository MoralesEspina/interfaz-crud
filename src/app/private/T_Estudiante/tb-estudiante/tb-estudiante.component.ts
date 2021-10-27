import { EstudianteService } from '../../../services/estudiante.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { TbEstudianteDataSource, TbEstudianteItem } from './tb-estudiante-datasource';

@Component({
  selector: 'app-tb-estudiante',
  templateUrl: './tb-estudiante.component.html',
  styleUrls: ['./tb-estudiante.component.css']
})
export class TbEstudianteComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TbEstudianteItem>;
  dataSource: TbEstudianteDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'idpersona', 'fecha_ingreso', 'carnet', 'status', 'acciones'];

  constructor(private _estudianteService: EstudianteService, private _snackBar: MatSnackBar, private _router : Router) {
    this.dataSource = new TbEstudianteDataSource();
    this._estudianteService.getEstudiante().subscribe(
      res=>{
        console.log(res);
        this.dataSource.data = res;
      }
    )
  }

  eliminarEstudiante(id:number){
    this._estudianteService.deleteEstudiante(id);
    this._snackBar.open('La Persona Fue Eliminada Con Éxito','',
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
