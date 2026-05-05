import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import PopupModal from "../components/PopupModal.jsx";
import "../styles/contact.css";

export default function Contact() {
  const [popup, setPopup] = useState({ open: false });
  const handleSubmit = (e) => {
    e.preventDefault();
    setPopup({ open: true, type: "success", title: "Message sent!", message: "We'll get back to you within 24 hours." });
    e.target.reset();
  };
  return (
    <>
      <section className="contact-hero">
        <div className="blob animate-blob" style={{ background: 'hsl(8 85% 65%)', width: 400, height: 400, top: -50, right: -50 }}/>
        <div className="container-x relative z-10">
          <span className="eyebrow">Contact us</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Let's <span className="gradient-text">talk</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Have questions or need help? We're here for you.</p>
        </div>
      </section>
      <section className="section !pt-0">
        <div className="container-x grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <Mail/>, t: "Email", d: "admin@doctorhub.com", v: "" },
            { icon: <Phone/>, t: "Phone", d: "+91 9000-000-000", v: "coral" },
            { icon: <MapPin/>, t: "Location", d: "Bengaluru, India", v: "purple" },
          ].map(c => (
            <div key={c.t} className="feature-card text-center">
              <div className={`icon-bubble mx-auto ${c.v}`}>{c.icon}</div>
              <h3 className="font-bold text-lg">{c.t}</h3>
              <p className="text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="container-x grid md:grid-cols-2 gap-10 items-center">
          <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80" alt="Get in touch" className="rounded-[32px] shadow-card w-full" loading="lazy" width={900} height={700}/>
          <form onSubmit={handleSubmit} className="feature-card space-y-4">
            <h3 className="text-2xl font-extrabold mb-2">Send us a message</h3>
            <input required name="name" placeholder="Your name" className="contact-input" />
            <input required type="email" name="email" placeholder="Email address" className="contact-input" />
            <textarea required name="message" rows={5} placeholder="Your message" className="contact-input resize-none" />
            <button type="submit" className="btn-primary w-full">Send message <Send size={16}/></button>
          </form>
        </div>
      </section>
      <PopupModal {...popup} onClose={() => setPopup({ open: false })} />
    </>
  );
}
