
export interface Wallpaper {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: string;
  categorySlug: string;
  tags: string[];
  resolution: string;
  downloads: number;
  likes: number;
  uploadDate: string;
  colors: string[];
}
