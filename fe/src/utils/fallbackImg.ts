import image from '../assets/images/not-found.svg';

export function handleImageFallback(event: React.SyntheticEvent<HTMLImageElement>) {
  const img = event.target as HTMLImageElement;
  img.src = image;
}
