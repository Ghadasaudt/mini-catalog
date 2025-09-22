import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private storageKey = 'mini-catalog-items';

  constructor(private http: HttpClient) {}

  list(): Observable<Item[]> {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      return of(JSON.parse(saved));
    }
    return this.http.get<Item[]>('/assets/items.json');
  }

  toggleFavorite(id: number) {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) return;
    const items: Item[] = JSON.parse(saved);
    const index = items.findIndex(i => i.id === id);
    if (index > -1) {
      items[index].favorite = !items[index].favorite;
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
  }
}
