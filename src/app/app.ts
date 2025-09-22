import { Component } from '@angular/core';
import { ListComponent } from './items/list/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListComponent],
  template: `
    <main>
      <h1>Mini Catalog</h1>
      <app-list></app-list>
    </main>
  `,
  styles: [`
    main {
      padding: 1rem;
      font-family: Arial, sans-serif;
    }
  `]
})
export class AppComponent {}
