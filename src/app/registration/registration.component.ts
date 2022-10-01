import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidationsService } from '../services/common-services/form-validations.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  formErrors = {
    'name': '',
    'mobileNo': '',
    'email': '',
    'password': '',
    'cnfPassword': '',
  }
  constructor(
    public formBuilder: FormBuilder,
    public formValidation: FormValidationsService
  ) { }

  buildForm() {
    this.registrationForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern('')]),
      mobileNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.pattern('')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cnfPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.registrationForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.registrationForm, this.formErrors, true)
    });
  }
  ngOnInit(): void {
    this.buildForm();
  }

  onRegister() {
    if(this.registrationForm.valid) {

    } else {
      this.formErrors = this.formValidation.validateForm(this.registrationForm, this.formErrors, false);
    }
  }

}
