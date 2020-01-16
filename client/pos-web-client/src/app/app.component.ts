import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pos-web-client';
  LoadedPath = 'sell'
  onNavigate(selectedPath: string) {
    this.LoadedPath = selectedPath;
  }
}
