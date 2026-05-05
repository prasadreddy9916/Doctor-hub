import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function NotFound() {
  const location = useLocation();
  useEffect(() => { console.error("404:", location.pathname); }, [location.pathname]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(210_40%_99%)]">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold gradient-text mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
        <Link to="/" className="btn-primary">Return Home</Link>
      </div>
    </div>
  );
}
