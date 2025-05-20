
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Wallpaper } from "@/types/wallpaper";

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  priority?: boolean;
}

const WallpaperCard = ({ wallpaper, priority = false }: WallpaperCardProps) => {
  return (
    <Link to={`/wallpaper/${wallpaper.id}`} className="block">
      <Card className="wallpaper-card h-full overflow-hidden border-0 rounded-xl shadow-md hover:shadow-lg">
        <div className="relative pb-[56.25%]">
          <img
            src={wallpaper.thumbnailUrl}
            alt={wallpaper.title}
            loading={priority ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-transform"
          />
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm truncate">{wallpaper.title}</h3>
          <p className="text-xs text-muted-foreground">{wallpaper.category}</p>
        </div>
      </Card>
    </Link>
  );
};

export default WallpaperCard;
