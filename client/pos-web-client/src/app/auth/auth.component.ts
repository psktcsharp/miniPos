import { Component, OnInit } from '@angular/core';

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

}
