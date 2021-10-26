import { Persona } from './../../interfaces/persona';
import { RegistroService } from '../../services/registros.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TbPersonaDataSource, TbPersonaItem } from './tb-persona-datasource';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-tb-persona',
  templateUrl: './tb-persona.component.html',
  styleUrls: ['./tb-persona.component.css']
})
export class TbPersonaComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TbPersonaItem>;
  dataSource: TbPersonaDataSource;


  displayedColumns = ['id', 'nombre','apellido','fecha_nacimiento','direccion','acciones'];

  constructor(private _personaService: RegistroService, private _snackBar: MatSnackBar, private _router : Router) {

    this.cargarUsuario();
  }
  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(){

    this.dataSource = new TbPersonaDataSource();
    this._personaService.getPersona().subscribe(
      res=>{
        this.dataSource.data = res;
      }
    )
  }

  eliminarUsuario(id:number){
    this._personaService.deletePersona(id);
    this.cargarUsuario();

    this._snackBar.open('La Persona Fue Eliminada Con Éxito','',
    {
      duration:1000,
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
