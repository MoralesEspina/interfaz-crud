import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { AsigEstudiante } from 'src/app/interface/asigEstudiante';
import { AsigEstudianteService } from 'src/app/services/asigEstudiante';
import { TbAsigEstudianteDataSource } from './tb-asig-estudiante-datasource';

@Component({
  selector: 'app-tb-asig-estudiante',
  templateUrl: './tb-asig-estudiante.component.html',
  styleUrls: ['./tb-asig-estudiante.component.css']
})
export class TbAsigEstudianteComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AsigEstudiante>;
  dataSource: TbAsigEstudianteDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'id_estudiante', 'id_curso', 'status', 'fecha_inicio', 'fecha_fin', 'acciones'];

  constructor(private _asigEstudianteService: AsigEstudianteService,
    private _snackBar: MatSnackBar, private _router : Router) {
    this.dataSource = new TbAsigEstudianteDataSource();
    this._asigEstudianteService.getAsignacion().subscribe(
      res=>{
        console.log(res);
        this.dataSource.data = res;
      }
    )
  }

  eliminarAsigEstudiante(id:number){
    this._asigEstudianteService.deleteAsignacion(id);
    this._snackBar.open('La Asignación Fue Eliminada Con Éxito','',
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
