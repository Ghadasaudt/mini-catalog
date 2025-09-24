import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  template: `
    <h1>Mini Catalog</h1>
    <nav><a routerLink="/">Home</a> <a routerLink="/items/new">New Item</a></nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
