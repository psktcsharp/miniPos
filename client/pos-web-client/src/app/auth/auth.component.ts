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
  isLoading = false;
  //current login state to check what state is the user in ( logged in - logged out)
  LoginState = true;
  error: string = null;
  data: any;

  constructor(private authService: AuthService, private router: Router) {


  }

  ngOnInit() {
    this.authService.currentData.subscribe(data => this.data = data);
  }
  onHandleError() {
    this.error = null;
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

    //change loading for spinner to appear
    this.isLoading = true;
    //check if we are logging in or singing up and act on it
    if (this.LoginState) {
      console.log("*SENDING A LOGIN REQUEST TO THE SERVER*")
      this.authService.login(email, password).subscribe(resData => {
        this.authService.changeData({ isAuthenticated: true });
        this.router.navigate(['/']);
      }, error => {
        console.log(error)
        this.isLoading = false;
        this.error = error.error.msg
        this.router.navigate(['/auth']);
      }
      )
    }
    else {
      //calling the authservice with subscribing to it to access the sign up method
      console.log("*SENDING A SIGN UP REQUEST TO THE SERVER*")
      this.authService.signup(email, password, fullName).subscribe(resData => {
        this.authService.changeData({ isAuthenticated: true });
        this.isLoading = false;
        this.router.navigate(['/']);
      }, error => {
        console.log(error)
        this.isLoading = false;
        this.error = error.error.msg
      }
      )
      // form.reset();
    }
  }
}
