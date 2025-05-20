
import { useParams, Link } from "react-router-dom";
import { useWallpapers } from "@/hooks/use-wallpapers";
import { useCategory } from "@/hooks/use-categories";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WallpaperCard from "@/components/WallpaperCard";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { category, isLoading: categoryLoading, error: categoryError } = useCategory(slug || "");
  const { wallpapers, isLoading: wallpapersLoading, error: wallpapersError } = useWallpapers(slug);
  
  const isLoading = categoryLoading || wallpapersLoading;
  const error = categoryError || wallpapersError;

  useEffect(() => {
    // Set page title when category loads
    if (category) {
      document.title = `${category.name} Wallpapers - Aura Wallpaper Hub`;
    }
  }, [category]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container px-4 py-8 md:px-6">
          <div className="animate-pulse h-40 bg-muted rounded-xl mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="animate-pulse h-64 bg-muted rounded-xl"></div>
              ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-center h-96">
            <h1 className="text-2xl font-bold mb-4">Category not found</h1>
            <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="text-primary hover:underline">Return Home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8 md:px-6">
        <Link to="/categories" className="inline-flex items-center mb-6 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4 mr-1" /> All Categories
        </Link>

        {/* Category Header */}
        <div 
          className="relative rounded-xl overflow-hidden mb-8 h-48 md:h-64"
          style={{ backgroundImage: `url(${category.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name} Wallpapers</h1>
            <p className="text-white/80 max-w-2xl">{category.description}</p>
          </div>
        </div>

        {/* Wallpapers Grid */}
        {wallpapers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h2 className="text-xl font-medium mb-2">No wallpapers found</h2>
            <p className="text-muted-foreground">There are no wallpapers in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wallpapers.map((wallpaper) => (
              <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
