import { Component } from '@angular/core';
import { BackendHelperService } from 'src/app/services/backend-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private backendHelper: BackendHelperService) {}
}
