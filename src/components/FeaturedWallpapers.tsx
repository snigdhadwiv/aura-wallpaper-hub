
import { useState } from "react";
import { Button } from "@/components/ui/button";
import WallpaperCard from "./WallpaperCard";
import { useWallpapers } from "@/hooks/use-wallpapers";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedWallpapers = () => {
  const { wallpapers, isLoading } = useWallpapers();
  const [visibleCount, setVisibleCount] = useState(8);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, wallpapers.length));
  };

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Wallpapers</h2>
          <Link to="/popular" className="flex items-center text-primary hover:underline">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-muted rounded-xl animate-pulse h-48"
                ></div>
              ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wallpapers.slice(0, visibleCount).map((wallpaper) => (
                <WallpaperCard
                  key={wallpaper.id}
                  wallpaper={wallpaper}
                  priority={wallpaper.id <= 4}
                />
              ))}
            </div>

            {visibleCount < wallpapers.length && (
              <div className="mt-8 text-center">
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  className="px-8"
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedWallpapers;
