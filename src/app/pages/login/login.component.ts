import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService, EmailValidator} from '../../service/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;

  constructor(private _fb: FormBuilder,
              private router: Router,
              private spinnerService: NgxSpinnerService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, EmailValidator.isValid]],
      password: ['', [Validators.required]]
    });
  }

  login(formValue) {
    this.error = null;
    this.spinnerService.show();
    this.authService.emailLogin(formValue.email, formValue.password)
      .then((res) => {
        this.spinnerService.hide();
        this.router.navigate(['/app'])
          .then(() => {
          });
      })
      .catch((err) => {
        this.error = err.message;
        console.log('error occurred', err);
        this.spinnerService.hide();
      });
  }

}
