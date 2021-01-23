import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Employee } from '../_models';
import {Leave} from '../_models/leave';
import {Observable, pipe, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ModelMapper} from '../_map/model.mapper';
import {Employee} from '../_models/employee';
import {LeavePolicy} from '../_models/leave-policy';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private attendanceUrl = `${environment.apiUrl}/api/attendances/`;
    constructor(private http: HttpClient) { }

    // getAll() {
    //     return this.http.get<LeavePolicy[]>(this.attendanceUrl).pipe(
    //       map(data => data.map((item: any) => {
    //         return new ModelMapper(LeavePolicy).map(item);
    //       })));
    // }

    getStudent(id: number) {
        return this.http.get<LeavePolicy>(`${this.attendanceUrl}${id}`);
    }

  //   addAttendance (attendance: LeavePolicy): Observable<LeavePolicy> {
  // return this.http.post<LeavePolicy>(this.attendanceUrl, attendance, httpOptions)
  //   .pipe(
  //     catchError(this.handleError('addAttendance', attendance))
  //   );
  // }attendance

  private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
}

  getAttendance(id: number) {
    return this.http.get<LeavePolicy>(`${this.attendanceUrl}${id}`);
  }
}
