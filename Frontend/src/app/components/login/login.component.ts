import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackendHelperService } from 'src/app/services/backend-helper.service';
import { UtilService } from 'src/app/services/util.service';

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
  loading: boolean = false;

  constructor(
    private backendHelper: BackendHelperService,
    private utilService: UtilService
    ) {}

  userLogin() {
    if(!this.loading) {
      this.credentialErrors = [];
      this.validateCredentials();
  
      if(!this.credentialErrors.length) {
        this.utilService.showLoading(true, "Iniciando sesión...");
        this.loading = true;
        const user = {
          email: this.email,
          password: this.password
        }
        this.subscriptions.push(
          this.backendHelper.post("/user/login", user).subscribe({
            next: (token:any) => {
              this.utilService.showLoading(false); 
              this.loading = false;
              this.utilService.showPopUp("Se ha iniciado sesión correctamente", "correct");
              localStorage.setItem("token", token);
              // Redirect to /home
            },
            error: (error:any) => {
              this.utilService.showLoading(false); 
              this.loading = false;
              if(error.status !== 500) {
                this.utilService.showPopUp("El usuario no existe o las credenciales son incorrectas", "error");
              } else {
                this.utilService.showPopUp("Ha ocurrido un error en el servidor, vuelva a internarlo", "error");
              }
            }
          })
        )
      }
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
