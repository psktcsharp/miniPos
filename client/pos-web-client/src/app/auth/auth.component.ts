import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  //current login state to check what state is the user in ( logged in - logged out)
  LoginState = true;
  error: string = null;
  data: any;

  constructor(private authService: AuthService, private router: Router) {


  }

  ngOnInit() {
    this.authService.currentData.subscribe(data => this.data = data);
  }

  onSwitchState() {
    this.LoginState = !this.LoginState;
  }
  //handle form submit
  onSubmit(form: NgForm) {
    //extra valid check to avoid user playing with the state
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const fullName = form.value.fullName;


    //check if we are logging in or singing up and act on it
    if (this.LoginState) {
      this.authService.login(email, password).subscribe(resData => {
        this.authService.changeData({ isAuthenticated: true });
        this.router.navigate(['/sell']);
      }, error => {
        console.log(error)
        this.error = error.error.msg
      }
      )
    }
    else {
      //calling the authservice with subscribing to it to access the sign up method
      this.authService.signup(email, password, fullName).subscribe(resData => {
      }, error => {
        console.log(error)
        this.error = error.error.msg
      }
      )
      // form.reset();
    }
  }
}
