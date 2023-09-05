export function handleImageFallback(event: React.SyntheticEvent<HTMLImageElement>) {
  const img = event.target as HTMLImageElement;
  img.src = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';
}
