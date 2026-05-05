import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-br from-[hsl(200_50%_12%)] to-[hsl(184_60%_18%)] text-white">
      <div className="container-x px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="logo" className="h-10 w-10" width={40} height={40} loading="lazy" />
            <div>
              <div className="text-xl font-extrabold gradient-text">DoctorHub</div>
              <div className="text-xs text-white/60 tracking-widest uppercase">Learn. Grow. Heal.</div>
            </div>
          </div>
          <p className="text-white/70 text-sm">Empowering doctors with knowledge, growth, and a thriving learning community.</p>
          <div className="flex gap-3 mt-5">
            {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-green-500 font-bold text-xl">Quick Links</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            {["Home","About","Services","Contact"].map(l => (
              <li key={l}><Link to={`/${l === "Home" ? "" : l.toLowerCase()}`} className="hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-green-500 font-bold text-xl">Account</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/register" className="hover:text-white">Register</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-green-500 font-bold text-xl">Contact</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li className="flex items-center gap-2"><Mail size={16}/> admin@doctorhub.com</li>
            <li className="flex items-center gap-2"><Phone size={16}/> +91 9000-000-000</li>
            <li className="flex items-center gap-2"><MapPin size={16}/> Bengaluru, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-white/60 text-sm">
        © 2026 DoctorHub. All rights reserved.
      </div>
    </footer>
  );
}