import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemsService } from '../items.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form.html',
  styleUrls: ['./form.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  itemId?: number;

  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      description: ['', [Validators.maxLength(500)]],
      imageUrl: ['', Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))?$/)]
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.itemId = Number(idParam);
      const item = this.itemsService.getById(this.itemId);
      if (item) this.form.patchValue(item);
    }
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.value as Omit<Item, 'id' | 'favorite'>;

    if (this.isEdit && this.itemId != null) {
      this.itemsService.update({ ...data, id: this.itemId, favorite: false });
    } else {
  
    this.itemsService.add({ ...data, id: 0, favorite: false });
  }

    this.router.navigateByUrl('/');
  }
}
