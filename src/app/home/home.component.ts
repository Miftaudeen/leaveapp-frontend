import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import {Employee} from '../_models';
import { EmployeeService, AuthenticationService } from '../_services';
import {DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    user: Employee;
    userFromApi: Employee;

    constructor(
        private userService: EmployeeService,
        private authenticationService: AuthenticationService,
        private datepipe: DatePipe,
        private http: HttpClient
    ) {
        this.user = this.authenticationService.userValue;
    }

    ngOnInit() {
        this.loading = true;
        this.userFromApi = this.user;
    }
}
