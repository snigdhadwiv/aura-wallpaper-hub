
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WallpaperCard from "@/components/WallpaperCard";
import { wallpapers as allWallpapers } from "@/data/wallpapers";
import { Wallpaper } from "@/types/wallpaper";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Wallpaper[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = `Search results for "${query}" - Aura Wallpaper Hub`;
    
    // Simple search function that checks title, description, category and tags
    const searchWallpapers = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!query) {
        setResults([]);
        setIsLoading(false);
        return;
      }
      
      const lowercaseQuery = query.toLowerCase();
      const filtered = allWallpapers.filter(wallpaper => 
        wallpaper.title.toLowerCase().includes(lowercaseQuery) ||
        wallpaper.description.toLowerCase().includes(lowercaseQuery) ||
        wallpaper.category.toLowerCase().includes(lowercaseQuery) ||
        wallpaper.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
      
      setResults(filtered);
      setIsLoading(false);
    };
    
    searchWallpapers();
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-muted-foreground mb-8">
          {isLoading 
            ? "Searching for wallpapers..." 
            : results.length === 0 
              ? "No wallpapers found matching your search." 
              : `Found ${results.length} wallpaper${results.length === 1 ? "" : "s"}.`}
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-muted rounded-xl animate-pulse h-64"
                ></div>
              ))}
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-xl font-medium mb-4">No wallpapers found</h2>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any wallpapers that match your search. Try using different keywords or browse our categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((wallpaper) => (
              <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
