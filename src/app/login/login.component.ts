import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConfig } from '../api.config';
import { Response } from '../models/response.model';
import { FormValidationsService } from '../services/common-services/form-validations.service';
import { HttpService } from '../services/common-services/http-api.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  formErrors = {
    email: '',
    password: ''
  }
  constructor(
    public formBuilder: FormBuilder,
    public formValidation: FormValidationsService,
    public httpService: HttpService,
    public apiConfig: ApiConfig,
    public loginService: LoginService,
    public router: Router
  ) { }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.loginForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.loginForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onLoginClicked() {
    if(this.loginForm.valid) {
      this.loginAPICall();
    } else {
      this.formErrors = this.formValidation.validateForm(this.loginForm, this.formErrors, false);
    }
  }

  loginAPICall() {
    let params = this.loginService.loginRequest(this.loginForm.value);
    let loginObservable = this.httpService.post<Response>(this.apiConfig.serviceName_LOGIN, params);
    loginObservable.subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('/dashboard');
    });
  }
}
