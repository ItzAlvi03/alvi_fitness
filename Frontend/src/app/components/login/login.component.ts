import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackendHelperService } from 'src/app/services/backend-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  // Variables that contains data from user
  email!: string;
  password!: string;

  // Contains all errors on credentials
  credentialErrors: string[] = [];

  subscriptions: Subscription[] = [];

  constructor(private backendHelper: BackendHelperService) {}

  userLogin() {
    this.credentialErrors = [];
    this.validateCredentials();

    if(!this.credentialErrors.length) {
      const user = {
        email: this.email,
        password: this.password
      }
      this.subscriptions.push(
        this.backendHelper.post("/user/login", user).subscribe({
          next: (token:any) => {
            localStorage.setItem("token", token);
          },
          error: (error:any) => {
            if(error.status !== 500) {
              // Pop up de que no existe
            }
          }
        })
      )
    }
  }

  validateCredentials() {
    // Email credential
    if(!this.email || this.email === "") {
      this.credentialErrors.push("email");
    }

    // Password credential
    if(!this.password || this.password === "") {
      this.credentialErrors.push("password");
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
