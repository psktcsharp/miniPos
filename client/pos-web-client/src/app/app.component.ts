import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    //auto login 
    this.authService.autoLogin()
  }
  constructor(private authService: AuthService) {

  }
  title = 'pos-web-client';
  LoadedPath = 'sell'
  onNavigate(selectedPath: string) {
    this.LoadedPath = selectedPath;
  }

}
