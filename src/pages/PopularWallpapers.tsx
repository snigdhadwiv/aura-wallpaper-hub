
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WallpaperCard from "@/components/WallpaperCard";
import { useWallpapers } from "@/hooks/use-wallpapers";

const PopularWallpapers = () => {
  const { wallpapers, isLoading } = useWallpapers();
  const [sortedWallpapers, setSortedWallpapers] = useState([...wallpapers]);

  useEffect(() => {
    document.title = "Popular Wallpapers - Aura Wallpaper Hub";
    // Sort wallpapers by downloads (most downloaded first)
    const sorted = [...wallpapers].sort((a, b) => b.downloads - a.downloads);
    setSortedWallpapers(sorted);
  }, [wallpapers]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Popular Wallpapers</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
          Our most downloaded wallpapers. Find the perfect background for your device.
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-muted rounded-xl animate-pulse h-64"
                ></div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedWallpapers.map((wallpaper) => (
              <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PopularWallpapers;
