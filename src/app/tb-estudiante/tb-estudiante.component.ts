import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PersonaService } from '../services/persona.service';
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
  displayedColumns = ['id', 'id_persona', 'fecha_ingreso', 'carnet', 'status'];

  constructor(private estudianteService: PersonaService) {
    this.dataSource = new TbEstudianteDataSource();
    this.estudianteService.getEstudiante().subscribe(
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
