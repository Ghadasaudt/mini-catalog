import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { ListComponent } from './items/list/list';
import { FormComponent } from './items/form/form';
import { DetailsComponent } from './items/details/details';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'items/new', component: FormComponent },
  { path: 'items/:id', component: DetailsComponent },
  { path: 'items/:id/edit', component: FormComponent },
  { path: '**', redirectTo: '' }
];

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes)]
};
