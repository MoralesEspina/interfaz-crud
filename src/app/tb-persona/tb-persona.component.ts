import { PersonaService } from './../services/persona.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TbPersonaDataSource, TbPersonaItem } from './tb-persona-datasource';

@Component({
  selector: 'app-tb-persona',
  templateUrl: './tb-persona.component.html',
  styleUrls: ['./tb-persona.component.css']
})
export class TbPersonaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TbPersonaItem>;
  dataSource: TbPersonaDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre','apellido','fecha_nacimiento','direccion'];

  constructor(private personaService: PersonaService) {
    this.dataSource = new TbPersonaDataSource();
    this.personaService.getPersona().subscribe(
      res=>{
        console.log(res);
        this.dataSource.data = res;
      }
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
