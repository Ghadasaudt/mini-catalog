import { bootstrapApplication } from '@angular/platform-browser';
import { ListComponent } from './app/items/list/list';

bootstrapApplication(ListComponent)
  .catch((err) => console.error(err));
