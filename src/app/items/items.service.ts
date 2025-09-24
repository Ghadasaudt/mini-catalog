
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Item } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private storageKey = 'mini-catalog-items';

  constructor(private http: HttpClient) {}

 
  list(): Observable<Item[]> {
    const saved = this.load();
    if (saved.length) {
      return of(saved); // lol no http if already saved
    }
    return this.http.get<Item[]>('assets/items.json').pipe(
      tap(items => this.save(items)) 
    );
  }

  // careful: this just looks in localStorage (not async)
  getById(id: number): Item | undefined {
    return this.load().find(i => i.id === id);
  }

  create(item: Item): void {
    const items = this.load();
    // auto ID (hope no duplicates 🤞)
    item.id = Math.max(0, ...items.map(i => i.id)) + 1;
    items.push(item);
    this.save(items);
  }

  update(updated: Item): void {
    const items = this.load();
    const index = items.findIndex(i => i.id === updated.id);
    if (index > -1) {
      items[index] = updated;
      this.save(items);
    }
  }

  toggleFavorite(id: number): void {
    const items = this.load();
    const index = items.findIndex(i => i.id === id);
    if (index > -1) {
      items[index].favorite = !items[index].favorite;
      this.save(items);
    }
  }

 
  private load(): Item[] {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  }

  private save(items: Item[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
