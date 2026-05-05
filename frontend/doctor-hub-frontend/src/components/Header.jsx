import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo1.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container-x flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center gap-3">
        
   <img
    src={logo}
    alt="DoctorHub logo"
    className="w-30 h-12 bg-gradient-to-r object-contain brightness-40 contrast-125 drop-shadow-md"
  />
 
          <div className="leading-tight">
            <div className="text-xl font-extrabold gradient-text">DoctorHub</div>
            <div className="text-[11px] text-muted-foreground tracking-widest uppercase">Learn. Grow. Heal.</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end className="nav-link">{l.label}</NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="btn-ghost !py-2 !px-5 text-sm">Login</Link>
          <Link to="/register" className="btn-primary !py-2 !px-5 text-sm">Register</Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end onClick={() => setOpen(false)} className="nav-link">{l.label}</NavLink>
          ))}
          <Link to="/login" className="btn-ghost text-sm">Login</Link>
          <Link to="/register" className="btn-primary text-sm">Register</Link>
        </div>
      )}
    </header>
  );
}