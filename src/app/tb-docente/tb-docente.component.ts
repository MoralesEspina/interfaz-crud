import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PersonaService } from '../services/persona.service';
import { TbDocenteDataSource, TbDocenteItem } from './tb-docente-datasource';

@Component({
  selector: 'app-tb-docente',
  templateUrl: './tb-docente.component.html',
  styleUrls: ['./tb-docente.component.css']
})
export class TbDocenteComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TbDocenteItem>;
  dataSource: TbDocenteDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'id_persona', 'fecha_ingreso'];

  constructor(private docenteService: PersonaService) {
    this.dataSource = new TbDocenteDataSource();
    this.docenteService.getDocente().subscribe(
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
