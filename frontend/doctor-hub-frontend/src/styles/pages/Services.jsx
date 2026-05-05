import { Link } from "react-router-dom";
import "../styles/services.css";

const services = [
  { icon: "🎥", title: "Video Learning", desc: "Watch real-world medical procedures and explanations.", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", variant: "" },
  { icon: "🖼️", title: "Image Learning", desc: "Understand complex topics through visuals.", img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80", variant: "coral" },
  { icon: "🎤", title: "Seminars", desc: "Access expert discussions and presentations.", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80", variant: "purple" },
  { icon: "📚", title: "Content Materials", desc: "Read structured and curated medical content.", img: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=800&q=80", variant: "amber" },
];

export default function Services() {
  return (
    <>
      <section className="services-hero">
        <div className="blob animate-blob" style={{ background: 'hsl(270 70% 70%)', width: 400, height: 400, top: -50, left: '50%', transform: 'translateX(-50%)' }}/>
        <div className="container-x relative z-10">
          <span className="eyebrow">Our services</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">What we <span className="gradient-text">offer</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Four powerful learning formats. One platform. Built for doctors.</p>
        </div>
      </section>
      <section className="section !pt-0">
        <div className="container-x space-y-12">
          {services.map((s, i) => (
            <div key={s.title} className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <img src={s.img} alt={s.title} className="rounded-[32px] shadow-card w-full" loading="lazy" width={800} height={500}/>
              <div>
                <div className={`icon-bubble ${s.variant}`}>{s.icon}</div>
                <h2 className="text-3xl font-extrabold mb-3">{s.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">{s.desc}</p>
                <Link to="/register" className="btn-primary">Try it now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
