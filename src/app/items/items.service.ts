import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import itemsData from '../../assets/items.json';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private storageKey = 'miniCatalogItems';
  private items: Item[] = [];

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.items = JSON.parse(saved);
    } else {
      this.items = itemsData;
      this.save();
    }
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  getAll(): Item[] {
    return [...this.items];
  }

  getById(id: number): Item | undefined {
    return this.items.find(i => i.id === id);
  }

  add(item: Item) {
    item.id = this.items.length
      ? Math.max(...this.items.map(i => i.id)) + 1
      : 1;
    this.items.push(item);
    this.save();
  }

  update(item: Item) {
    const index = this.items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.items[index] = item;
      this.save();
    }
  }

  toggleFavorite(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.favorite = !item.favorite;
      this.save();
    }
  }
}
