import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  loginMode = true;
  error: string;
  
  constructor(private authService: AuthService, private routerService: Router) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onLogin() {
    this.loginMode = true;
    this.onSubmit();
  }

  onSignUp() {
    this.loginMode = false;
    this.onSubmit();
  }

  onSubmit() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObs: Observable<AuthResponseData>;

    this.error = null;
    if (this.loginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (response) => {
        console.log(response);
        this.routerService.navigate(["/post-list"]);
      },
      (errorMessage) => {
        this.error = errorMessage;
        console.log(errorMessage);
      }
    );

    this.authForm.reset();
  }

}
