import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';

import { GiftService } from '../../services/gift.service';
import { GiftListComponent } from '../../components/gift-list.component';
import { Gift } from '../../models/gift.model';

@Component({
  selector: 'app-home',
  template: `
    <h1 class="title">Trending</h1>
    <div *ngIf="giftService.isLoading">loading...</div>
    <app-gift-list *ngIf="!giftService.isLoading" [gifts]="gifts" />
    <div class="no-data" *ngIf="!giftService.isLoading && gifts.length === 0">
      No data
    </div>
  `,
  standalone: true,
  imports: [GiftListComponent, AsyncPipe, NgIf],
  encapsulation: ViewEncapsulation.None,
})
export default class HomeComponent implements OnInit {
  protected readonly giftService = inject(GiftService);

  gifts: Gift[] = [];

  ngOnInit(): void {
    this.giftService.isLoading = true;
    this.giftService.getGifts().subscribe({
      next: (gifts) => {
        this.gifts = gifts;
      },
      error: () => {},
      complete: () => {
        this.giftService.isLoading = false;
      },
    });
  }
}
