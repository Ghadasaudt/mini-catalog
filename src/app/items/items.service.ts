import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() {}

  loadInitial(): Observable<Item[]> {
    return of([
      { id: 1, title: 'Laptop', category: 'Electronics', price: 1200 },
      { id: 2, title: 'Chair', category: 'Furniture', price: 150 },
      { id: 3, title: 'Book', category: 'Education', price: 30 }
    ]);
  }
}
