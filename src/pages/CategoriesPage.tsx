
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import { useCategories } from "@/hooks/use-categories";
import { useEffect } from "react";

const CategoriesPage = () => {
  const { categories, isLoading, error } = useCategories();

  useEffect(() => {
    document.title = "Browse Categories - Aura Wallpaper Hub";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Browse Categories</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
          Explore our collection of wallpapers organized by categories. Find the perfect wallpaper for your device.
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-muted rounded-xl animate-pulse"
                  style={{ height: "180px" }}
                ></div>
              ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h2 className="text-xl font-medium mb-2">Failed to load categories</h2>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
