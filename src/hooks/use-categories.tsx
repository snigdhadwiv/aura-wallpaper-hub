
import { useState, useEffect } from "react";
import { Category } from "@/types/category";
import { categories as categoriesData } from "@/data/categories";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        // Simulate API fetch delay
        await new Promise((resolve) => setTimeout(resolve, 400));
        
        setCategories(categoriesData);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load categories"));
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, isLoading, error };
}

export function useCategory(slug: string) {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        // Simulate API fetch delay
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        const found = categoriesData.find((c) => c.slug === slug);
        
        if (!found) {
          throw new Error("Category not found");
        }
        
        setCategory(found);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load category"));
        setIsLoading(false);
      }
    };

    loadCategory();
  }, [slug]);

  return { category, isLoading, error };
}
