
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Hero background with gradient overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Transform Your Screens With Stunning Wallpapers
          </h1>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground">
            Browse our collection of high-quality wallpapers for any device.
            Find the perfect background that matches your style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-aura-gradient hover:opacity-90">
              <Link to="/popular">Popular Wallpapers</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
