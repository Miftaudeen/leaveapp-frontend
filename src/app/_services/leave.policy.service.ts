import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import {Employee, LeavePolicy} from '../_models';
import {map} from 'rxjs/operators';
import {ModelMapper} from '../_map/model.mapper';

@Injectable({ providedIn: 'root' })
export class LeavePolicyService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<LeavePolicy[]>(`${environment.apiUrl}/api/leave/policies/`).pipe(
          map(data => {
            return data.map((item: any) => {
              console.log(item);
              return new LeavePolicy(item.id, item.leave_type);
            });
          }));
    }

    getLeavePolicy(id: number) {
        return this.http.get<LeavePolicy>(`${environment.apiUrl}/api/leave/policies/${id}`);
    }
}
