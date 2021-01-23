import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import {Leave} from '../_models';
import {map} from 'rxjs/operators';
import {ModelMapper} from '../_map/model.mapper';

@Injectable({ providedIn: 'root' })
export class LeaveService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Leave[]>(`${environment.apiUrl}/api/leaves`).pipe(
          map(data => data.map((item: any) => {
            return new ModelMapper(Leave).map(item);
          })));
    }

    getLeave(id: number) {
        return this.http.get<Leave>(`${environment.apiUrl}/api/leaves/${id}`);
    }
}
