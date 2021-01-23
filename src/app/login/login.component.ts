import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthenticationService} from '../_services';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  private error: string;
  private loading: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';

    this.form = this.fb.group({
      username: ['', null],
      password: ['', Validators.required]
    });

  }

   // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}

