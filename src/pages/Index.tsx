
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedWallpapers from "@/components/FeaturedWallpapers";
import CategoriesSection from "@/components/CategoriesSection";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "Aura Wallpaper Hub - Beautiful High-Quality Wallpapers";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedWallpapers />
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
