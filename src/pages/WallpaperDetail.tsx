
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useWallpaper } from "@/hooks/use-wallpapers";
import { Download, Share2, Heart, ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";

const WallpaperDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { wallpaper, isLoading, error } = useWallpaper(Number(id));
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    // In a real app, this would trigger an actual download
    toast({
      title: "Download started",
      description: "Your wallpaper is being downloaded",
      duration: 3000,
    });
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Wallpaper link copied to clipboard",
      duration: 3000,
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? "Wallpaper removed from your favorites" : "Wallpaper added to your favorites",
      duration: 3000,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container px-4 py-8 md:px-6">
          <div className="flex items-center justify-center h-96">
            <div className="animate-pulse w-full max-w-5xl h-full bg-muted rounded-xl"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !wallpaper) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-center h-96">
            <h1 className="text-2xl font-bold mb-4">Wallpaper not found</h1>
            <p className="text-muted-foreground mb-6">The wallpaper you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/">Return Home</Link>
            </Button>
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
        <Link to="/" className="inline-flex items-center mb-6 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Wallpapers
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wallpaper preview */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img 
                src={wallpaper.imageUrl} 
                alt={wallpaper.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Wallpaper details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{wallpaper.title}</h1>
              <p className="text-muted-foreground">{wallpaper.description}</p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Resolution</span>
                <span>{wallpaper.resolution}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Category</span>
                <Link to={`/category/${wallpaper.categorySlug}`} className="text-primary hover:underline">
                  {wallpaper.category}
                </Link>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Downloads</span>
                <span>{wallpaper.downloads.toLocaleString()}</span>
              </div>
            </div>

            <Separator />

            <div>
              <span className="font-medium block mb-3">Colors</span>
              <div className="flex gap-2">
                {wallpaper.colors.map((color, i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full shadow-sm" 
                    style={{ backgroundColor: color }}
                    title={color}
                  ></div>
                ))}
              </div>
            </div>

            <div>
              <span className="font-medium block mb-3">Tags</span>
              <div className="flex flex-wrap gap-2">
                {wallpaper.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleDownload} className="w-full mb-3 bg-aura-gradient hover:opacity-90">
                <Download className="mr-2 h-4 w-4" /> Download Wallpaper
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleLike} 
                  variant={isLiked ? "default" : "outline"} 
                  className={`flex-1 ${isLiked ? "bg-pink-500 hover:bg-pink-600" : ""}`}
                >
                  {isLiked ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" /> Liked
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-4 w-4" /> Like
                    </>
                  )}
                </Button>
                
                <Button onClick={handleShare} variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WallpaperDetail;
