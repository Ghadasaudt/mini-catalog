import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../items.service';
import { Item } from '../models/item.model';

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

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.list().subscribe(items => {
      this.items = items;
      this.categories = Array.from(new Set(items.map(i => i.category))).sort();
    });
  }

  filteredItems() {
    let res = [...this.items];
    if (this.q) res = res.filter(i => i.title.toLowerCase().includes(this.q.toLowerCase()));
    if (this.category) res = res.filter(i => i.category === this.category);
    if (this.sort) {
      if (this.sort === 'price_asc') res.sort((a, b) => a.price - b.price);
      if (this.sort === 'price_desc') res.sort((a, b) => b.price - a.price);
      if (this.sort === 'rating_asc') res.sort((a, b) => a.rating - b.rating);
      if (this.sort === 'rating_desc') res.sort((a, b) => b.rating - a.rating);
    }
    return res;
  }

  trackById(index: number, item: Item) { return item.id; }

  toggleFavorite(item: Item) {
    this.itemService.toggleFavorite(item.id); // ✅ matches service
  }
}
