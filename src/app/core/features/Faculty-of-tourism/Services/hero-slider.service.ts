import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { HeroSliderData } from '../model/hero-slider.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroSliderService {
  constructor(private http: HttpClient) {}

  getHeroSliderData(): Observable<HeroSliderData> {
    return this.http.get<any>(`${environment.apiUrl}herosections/getall`).pipe(
      map(response => {
        const slides = response.data.map((item: any) => ({
          title: item.title,
          description: item.description,
          image: item.heroAttachments[0]?.url, // أول صورة من الـ attachments
          buttonText: null, // لو عايز تضيف زرار من الـ API
          buttonLink: null
        }));

        return {
          autoPlay: true,
          interval: 5000,
          slides
        } as HeroSliderData;
      })
    );
  }
}
