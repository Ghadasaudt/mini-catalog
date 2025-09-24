import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../../models/item.model';   
import { ItemsService } from '../items.service'; 

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class ListComponent {
  items: Item[] = [];
  search = '';
  category = '';
  sortBy = '';
  categories: string[] = []; 

  constructor(private itemsService: ItemsService) {
    this.items = this.itemsService.getAll();
    this.categories = [...new Set(this.items.map(i => i.category))]; 
  }

  get filtered() {
    return this.items
      .filter(i =>
        i.title.toLowerCase().includes(this.search.toLowerCase())
      )
      .filter(i =>
        this.category ? i.category === this.category : true
      )
      .sort((a, b) => {
        if (this.sortBy === 'price') return a.price - b.price;
        if (this.sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }

  trackById(_index: number, item: Item) {
    return item.id;
  }

  toggleFav(id: number) {
    this.itemsService.toggleFavorite(id);
  }
}
