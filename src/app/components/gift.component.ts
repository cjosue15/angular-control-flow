import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Gift } from '../models/gift.model';

@Component({
  selector: 'app-gift',
  template: `
    <h2>{{ gift?.title }}</h2>
    <img [src]="gift?.url" />
    <small>Created by: {{ gift?.createdBy }}</small>
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-gift',
  },
})
export class GiftComponent {
  @Input({ required: true }) gift: Gift | null = null;
}
