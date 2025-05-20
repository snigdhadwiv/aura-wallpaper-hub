
import { useState, useEffect } from "react";
import { Wallpaper } from "@/types/wallpaper";
import { wallpapers as wallpapersData } from "@/data/wallpapers";

export function useWallpapers(categorySlug?: string) {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadWallpapers = async () => {
      try {
        // Simulate API fetch delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Filter by category if provided
        const filteredWallpapers = categorySlug
          ? wallpapersData.filter((w) => w.categorySlug === categorySlug)
          : wallpapersData;
        
        setWallpapers(filteredWallpapers);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load wallpapers"));
        setIsLoading(false);
      }
    };

    loadWallpapers();
  }, [categorySlug]);

  return { wallpapers, isLoading, error };
}

export function useWallpaper(id: number) {
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadWallpaper = async () => {
      try {
        // Simulate API fetch delay
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        const found = wallpapersData.find((w) => w.id === id);
        
        if (!found) {
          throw new Error("Wallpaper not found");
        }
        
        setWallpaper(found);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load wallpaper"));
        setIsLoading(false);
      }
    };

    loadWallpaper();
  }, [id]);

  return { wallpaper, isLoading, error };
}
