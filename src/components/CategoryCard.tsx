
import { Link } from "react-router-dom";
import { Category } from "@/types/category";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/category/${category.slug}`} className="block">
      <div className="category-card">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-end z-10 p-4">
          <h3 className="text-white font-bold text-lg">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
