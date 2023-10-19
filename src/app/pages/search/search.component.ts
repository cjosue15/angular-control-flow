import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GiftListComponent } from '../../components/gift-list.component';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { GiftService } from '../../services/gift.service';
import { Gift } from '../../models/gift.model';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-search',
  template: `
    <h1 class="title">Search</h1>
    <div class="search-box">
      <input type="text" [formControl]="search" />
    </div>
    <div *ngIf="giftService.isLoading">loading...</div>
    <app-gift-list *ngIf="!giftService.isLoading" [gifts]="gifts" />
    <div
      class="no-data"
      *ngIf="!firstLoad && !giftService.isLoading && gifts.length === 0"
    >
      No gifts to display 😔
    </div>
  `,
  host: {
    class: 'app-search',
  },
  standalone: true,
  imports: [GiftListComponent, ReactiveFormsModule, AsyncPipe, NgIf],
})
export default class SearchComponent {
  firstLoad = true;

  search = new FormControl(null);

  protected readonly giftService = inject(GiftService);

  gifts: Gift[] = [];

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        tap(() => {
          if (this.firstLoad) {
            this.firstLoad = false;
          }
          this.giftService.isLoading = true;
        }),
        distinctUntilChanged(),
        debounceTime(500),
        switchMap((query) =>
          this.giftService.searchGifts(query!).pipe(
            catchError(() => {
              this.giftService.isLoading = false;
              return EMPTY;
            })
          )
        )
      )
      .subscribe({
        next: (gifts) => {
          this.gifts = gifts;
          this.giftService.isLoading = false;
        },
      });
  }
}
