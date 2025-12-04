
export interface SlideItem {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface HeroSliderData {
  slides: SlideItem[];
  autoPlay: boolean;
  interval: number;
}