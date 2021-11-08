import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { AsigDocente } from 'src/app/interface/asigDocente';
import { AsigDocenteService } from 'src/app/services/asigDocente';
import { TbAsigDocenteDataSource } from './tb-asig-docente-datasource';

@Component({
  selector: 'app-tb-asig-docente',
  templateUrl: './tb-asig-docente.component.html',
  styleUrls: ['./tb-asig-docente.component.css']
})
export class TbAsigDocenteComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AsigDocente>;
  dataSource: TbAsigDocenteDataSource;

  displayedColumns = ['id', 'id_docente', 'id_curso', 'status', 'fecha_inicio', 'fecha_fin', 'acciones'];

  constructor(private _asigDocenteService: AsigDocenteService,
    private _snackBar: MatSnackBar, private _router : Router) {
    this.dataSource = new TbAsigDocenteDataSource();
    this._asigDocenteService.getAsignacion().subscribe(
      res=>{
        console.log(res);
        this.dataSource.data = res;
      }
    )
  }

  eliminarAsigDocente(id:number){
    this._asigDocenteService.deleteAsignacion(id);
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
