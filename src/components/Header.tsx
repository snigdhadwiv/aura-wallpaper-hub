
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Moon, Sun, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    // Check system preference on load
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b z-50">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-aura-gradient w-8 h-8 rounded-full"></div>
          <span className="text-xl font-bold">Aura Wallpapers</span>
        </Link>
        
        {!isMobile && (
          <div className="flex-1 max-w-md px-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search wallpapers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          {isMobile ? (
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          ) : (
            <nav className="flex items-center gap-4">
              <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">Categories</Link>
              <Link to="/popular" className="text-sm font-medium hover:text-primary transition-colors">Popular</Link>
              <Link to="/recent" className="text-sm font-medium hover:text-primary transition-colors">Recent</Link>
            </nav>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b p-4 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-300">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search wallpapers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </form>
          
          <nav className="flex flex-col gap-3">
            <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors p-2">Categories</Link>
            <Link to="/popular" className="text-sm font-medium hover:text-primary transition-colors p-2">Popular</Link>
            <Link to="/recent" className="text-sm font-medium hover:text-primary transition-colors p-2">Recent</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
