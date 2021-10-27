import { PersonaService } from '../../../services/persona.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface TbPersonaItem {
  "id": number,
  "nombre":string,
  "apellido":string,
  "fecha_nacimiento":string,
  "direccion":string
}

export class TbPersonaDataSource extends DataSource<TbPersonaItem>  {
  data : TbPersonaItem[] = [];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(_personaService:PersonaService) {
    super();

    _personaService.getPersona().subscribe(
      res=>{
        this.data = res;
        console.log(res);
      }
    )
  }
  cargarUsuario(){

  }
  connect(): Observable<TbPersonaItem[]> {
    if (this.paginator && this.sort) {
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {}

  private getPagedData(data: TbPersonaItem[]): TbPersonaItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }


  private getSortedData(data: TbPersonaItem[]): TbPersonaItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
