import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

import { Gift } from '../models/gift.model';
import { GiftComponent } from './gift.component';

@Component({
  selector: 'app-gift-list',
  template: `
    <div class="grid-layout">
      <app-gift *ngFor="let gift of gifts" [gift]="gift" />
    </div>
  `,
  standalone: true,
  imports: [GiftComponent, NgForOf, NgIf],
  encapsulation: ViewEncapsulation.None,
})
export class GiftListComponent {
  @Input({ required: true }) gifts: Gift[] = [];
}
