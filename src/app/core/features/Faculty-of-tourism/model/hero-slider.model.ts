export interface HeroSliderData {
  autoPlay: boolean;
  interval: number;
  slides: {
    title: string;
    description: string;
    image: string;
    buttonText?: string;
    buttonLink?: string;
  }[];
}
