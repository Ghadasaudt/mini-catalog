import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ItemsService } from '../items.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.html',
  styleUrls: ['./details.scss']
})
export class DetailsComponent implements OnInit {
  item?: Item;

  constructor(private route: ActivatedRoute, private itemsService: ItemsService) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.item = this.itemsService.getById(Number(idParam));
    }
  }
}
