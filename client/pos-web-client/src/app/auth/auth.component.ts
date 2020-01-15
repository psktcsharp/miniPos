import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  //current login state to check what state is the user in ( logged in - logged out)
  LoginState = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
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
    //check if we are logging in or singing up and act on it
    if (this.LoginState) {
      //todo login..
    }
    else {
      //calling the authservice with subscribing to it to access the sign up method
      this.authService.signup(email, password).subscribe(resData => {
        console.log(resData);
      }, error => {
        console.log(error);
      }
      );

      form.reset();
    }
  }
}
