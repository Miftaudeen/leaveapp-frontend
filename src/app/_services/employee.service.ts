import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Employee } from '../_models';
import {map} from 'rxjs/operators';
import {ModelMapper} from '../_map/model.mapper';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Employee[]>(`${environment.apiUrl}/api/employees`).pipe(
          map(data => {
            return data.map((item: any) => {
              return new ModelMapper(Employee).map(item);
            });
          }));
    }

    getEmployee(id: number) {
        return this.http.get<Employee>(`${environment.apiUrl}/api/employees/${id}`);
    }
}
