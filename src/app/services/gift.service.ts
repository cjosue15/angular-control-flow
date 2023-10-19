import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Gift } from '../models/gift.model';

const gifAdapter = (response: any): Gift[] => {
  return response.map((gift: any) => ({
    id: gift.id,
    title: gift.title,
    url: gift.images.downsized_medium.url,
    createdBy: gift.username,
  }));
};

@Injectable({
  providedIn: 'root',
})
export class GiftService {
  protected readonly http = inject(HttpClient);

  protected loading = false;

  get isLoading(): boolean {
    return this.loading;
  }

  public set isLoading(value: boolean) {
    this.loading = value;
  }

  getGifts(): Observable<Gift[]> {
    return this.http
      .get<any>('https://api.giphy.com/v1/gifs/trending', {
        params: {
          api_key: 'tzh0tyOmiZ2NoFA0nK98d8GN7FqryY8B',
        },
      })
      .pipe(map((response) => gifAdapter(response.data)));
  }

  searchGifts(query: string): Observable<Gift[]> {
    return this.http
      .get<any>('https://api.giphy.com/v1/gifs/search', {
        params: {
          api_key: 'tzh0tyOmiZ2NoFA0nK98d8GN7FqryY8B',
          q: query,
        },
      })
      .pipe(map((response) => gifAdapter(response.data)));
  }
}
