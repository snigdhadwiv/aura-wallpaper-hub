
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CategoryCard from "./CategoryCard";
import { useCategories } from "@/hooks/use-categories";

const CategoriesSection = () => {
  const { categories, isLoading } = useCategories();

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Browse Categories</h2>
          <Link to="/categories" className="flex items-center text-primary hover:underline">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-muted rounded-xl animate-pulse"
                  style={{ height: "160px" }}
                ></div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="px-8">
            <Link to="/categories">Explore All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
