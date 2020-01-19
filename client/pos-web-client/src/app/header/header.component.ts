import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data: any;
  isAuthenticated = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.currentData.subscribe(data =>
      this.isAuthenticated = data.isAuthenticated
    );

    //ALWAYS LET ME IN FOR TESTING || REMOVE WHEN DONE !!!!
    // this.authService.changeData({ isAuthenticated: true });


    //auto login 
    this.authService.autoLogin()
  }
  onLogout() {
    this.authService.changeData({ isAuthenticated: false });
    this.isAuthenticated = false;
    this.authService.logout();

  }
  ngOnChanges(changes: SimpleChanges) {
    this.router.navigate(['/auth']);
  }
}
