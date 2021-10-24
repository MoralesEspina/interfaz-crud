import { Persona } from './../../interfaces/persona';
import { PersonaService } from '../../services/persona.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TbPersonaDataSource, TbPersonaItem } from './tb-persona-datasource';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre','apellido','fecha_nacimiento','direccion','acciones'];

  constructor(private _personaService: PersonaService, private _snackBar: MatSnackBar, private _router : Router) {

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

  /*modificarUsuario(id:number, nombre:string, apellido:string, fecha_nacimiento:Date, direccion:string){

    const persona = {
      nombre: nombre,
      apellido: apellido,
      fecha_nacimiento: fecha_nacimiento,
      direccion: direccion
    }
      this._personaService.modificarPersona(id, persona);
      this._router.navigate(["/tb_persona"]);
      this._snackBar.open('La Persona Fue Modificada Con Éxito','',
    {
      duration:2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }*/

  eliminarUsuario(id:number){
    this._personaService.deletePersona(id);
    this.cargarUsuario();

    this._snackBar.open('La Persona Fue Eliminada Con Éxito','',
    {
      duration:2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
