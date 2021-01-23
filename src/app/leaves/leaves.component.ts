import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Employee, Leave, LeavePolicy} from '../_models';
import {LeaveService} from '../_services/leave.service';
import {AuthenticationService, EmployeeService} from '../_services';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {LeavePolicyService} from '../_services/leave.policy.service';

// @ts-ignore
@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) leavePaginator: MatPaginator;
  @ViewChild(MatPaginator) studPaginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;
  dataSource: MatTableDataSource<Leave>;
  leaves: Leave[];
  leavePolicies: LeavePolicy[];
  private user: Employee;
  form: FormGroup;
  myControl = new FormControl();
  policyControl = new FormControl();
  employees: Employee[];
  filteredOptions: Observable<Employee[]>;
  filteredPolicyOptions: Observable<LeavePolicy[]>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['seqNo', 'employee', 'submissionDate', 'startDate', 'endDate', 'status'];
  public isAuthenticated: boolean;

  constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private datepipe: DatePipe,
        private leaveService: LeaveService, private authenticationService: AuthenticationService,
        private employeeService: EmployeeService,
        private leavePolicyService: LeavePolicyService
    ) {
    this.authenticationService.user.subscribe(x => this.user = x);
    if (this.authenticationService.userValue) {
      this.user = this.authenticationService.userValue;
      this.isAuthenticated = true;
        }
    }

  ngOnInit(){
    this.form = this.fb.group({
      employee: ['', Validators.min(1)]
    });
    this.getLeaves();
  }

  private getLeaves() {
     this.leaveService.getAll().subscribe((leaves: Leave[]) => {
      this.leaves = leaves;
      this.dataSource = new MatTableDataSource<Leave>(leaves);
      console.log(this.dataSource.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.leavePaginator;
    });
     this.employeeService.getAll().subscribe(
      (employees: Employee[]) => {
        console.log(employees);
        if (employees){
          this.employees = employees;
          this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.first_name),
        map(name => name ? this._filter(name) : this.employees.slice())
      );
        }

        return this.employees; });
     this.leavePolicyService.getAll().subscribe(
      (leavePolicies: LeavePolicy[]) => {
        console.log(leavePolicies);
        if (leavePolicies){
          this.leavePolicies = leavePolicies;
          this.filteredPolicyOptions = this.policyControl.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.leave_type),
        map(name => name ? this._filterPolicies(name) : this.leavePolicies.slice())
      );
        }

        return this.leavePolicies; });
  }

  private _filter(name: string): Employee[] {
    const filterValue = name.toLowerCase();

    return this.employees.filter(option => option.first_name.toLowerCase().indexOf(filterValue) === 0
      || option.last_name.toLowerCase().indexOf(filterValue) === 0
      || option.middle_name.toLowerCase().indexOf(filterValue) === 0
      || option.username.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterPolicies(name: string): LeavePolicy[] {
    const filterValue = name.toLowerCase();

    return this.leavePolicies.filter(option => option.leave_type.toLowerCase().indexOf(filterValue) === 0
    );
  }

  postLeave(relief: string, startDate: string, endDate: string, leavePolicy: string) {

    const body = {
      employee: this.user.id,
      relief: parseInt(relief),
      leave_policy: parseInt(leavePolicy),
      submission_date: this.datepipe.transform(Date.now(), 'yyyy-MM-ddThh:mm:ssZ'),
      start_date: startDate,
      end_date: endDate,
      changed_by: this.user.id,
      handover_note: null
    };
    console.log(body);
    this.http.post(`${environment.apiUrl}/api/leaves/create/`, body).subscribe((data) => {
      console.log(data);
      this.getLeaves();
    });


  }

  getStudent(item: Employee){
    return item.last_name + ' ' + item.first_name + ' ' + item.middle_name;
  }

}
