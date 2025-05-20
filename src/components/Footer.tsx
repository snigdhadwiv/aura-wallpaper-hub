
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="border-t py-8 mt-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-aura-gradient w-6 h-6 rounded-full"></div>
              <span className="font-bold">Aura Wallpapers</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Discover and download high-quality wallpapers for your desktop and mobile devices.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/nature" className="text-muted-foreground hover:text-primary transition-colors">Nature</Link></li>
              <li><Link to="/category/abstract" className="text-muted-foreground hover:text-primary transition-colors">Abstract</Link></li>
              <li><Link to="/category/minimal" className="text-muted-foreground hover:text-primary transition-colors">Minimal</Link></li>
              <li><Link to="/category/space" className="text-muted-foreground hover:text-primary transition-colors">Space</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">View All</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/popular" className="text-muted-foreground hover:text-primary transition-colors">Popular</Link></li>
              <li><Link to="/recent" className="text-muted-foreground hover:text-primary transition-colors">Recent Uploads</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {year} Aura Wallpapers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
