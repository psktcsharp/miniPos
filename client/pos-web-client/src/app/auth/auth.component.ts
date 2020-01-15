import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { format } from 'url';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  //current login state to check what state is the user in ( logged in - logged out)
  LoginState = true;
  onSwitchState() {
    this.LoginState = !this.LoginState;
  }
  constructor() { }

  ngOnInit() {
  }
  //handle form submit
  onSubmit(from: NgForm) {
    console.log(from.value)
    from.reset();
  }
}
