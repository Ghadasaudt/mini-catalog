import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../items.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class ListComponent implements OnInit {
  items: Item[] = [];
  q = '';
  category = '';
  sort = '';
  categories: string[] = [];

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.loadItems();
  }

  private loadItems() {
    this.itemsService.list().subscribe((items: Item[]) => {
      this.items = items;
      this.categories = [...new Set(items.map(i => i.category))].sort();
    });
  }

  get filteredItems(): Item[] {
    let res = [...this.items];
    if (this.q) res = res.filter(i => i.title.toLowerCase().includes(this.q.toLowerCase()));
    if (this.category) res = res.filter(i => i.category === this.category);
    switch (this.sort) {
      case 'price_asc': res.sort((a, b) => a.price - b.price); break;
      case 'price_desc': res.sort((a, b) => b.price - a.price); break;
      case 'rating_asc': res.sort((a, b) => a.rating - b.rating); break;
      case 'rating_desc': res.sort((a, b) => b.rating - a.rating); break;
    }
    return res;
  }

  trackById = (_: number, item: Item) => item.id;

  toggleFavorite(item: Item) {
    this.itemsService.toggleFavorite(item.id);
    // update local state immediately for UI
    item.favorite = !item.favorite;
  }
}
