import { Component } from '@angular/core';
import {Employee} from './_models';
import {AuthenticationService} from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Leave Application Portal';
  isAuthenticated = false;
  private user: Employee;
  constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.user.subscribe(x => this.user = x);
        if (authenticationService.userValue) {
          this.isAuthenticated = true;
        }
    }
    get isAdmin() {
        return this.user && this.user.isAdmin;
    }
    logout() {
        this.authenticationService.logout();
    }

}
