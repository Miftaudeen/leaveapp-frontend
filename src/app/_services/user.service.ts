import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Employee } from '../_models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Employee[]>(`${environment.apiUrl}/api/employees`);
    }

    getById(id: number) {
        return this.http.get<Employee>(`${environment.apiUrl}/api/employees/${id}/`);
    }
}
