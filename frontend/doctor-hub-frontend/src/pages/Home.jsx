import { Link } from "react-router-dom";
import { useEffect } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import { Star, Users, BookOpen, Award, Globe, Sparkles, ArrowRight } from "lucide-react";
// Using the new store you just created
import useCountStoreAll from "../context/useCountStoreAll"; 
import "../styles/home.css";

const offerings = [
  { icon: "🎥", title: "Videos", desc: "Real-world procedures and demonstrations", variant: "default" },
  { icon: "🖼️", title: "Images", desc: "Visual understanding of complex topics", variant: "coral" },
  { icon: "🎤", title: "Seminars", desc: "Expert-led discussions and sessions", variant: "purple" },
  { icon: "📚", title: "Content", desc: "Structured medical learning materials", variant: "amber" },
];

export default function Home() {
  // Use the NEW store here
  const { stats, loading, fetchStats } = useCountStoreAll();

  // Fetch data on mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Helper to format numbers
  const formatNumber = (num) => {
    if (!num && num !== 0) return "0";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K+";
    return num + "+";
  };

  // Safety check
  if (!stats || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 animate-pulse">
        Loading platform stats...
      </div>
    );
  }

  // Dynamic stats using the new store
  const dynamicStats = [
    { n: formatNumber(stats.totalDoctors), l: "Doctors learning" },
    { n: formatNumber(stats.video), l: "Video lessons" },
    { n: formatNumber(stats.seminar), l: "Live seminars" },
    { n: formatNumber(stats.image), l: "Visual resources" },
  ];

  const reasons = [
    { icon: <Users size={22} />, title: "Built for doctors", desc: "Designed specifically for medical professionals.", variant: "" },
    { icon: <Globe size={22} />, title: "All specializations", desc: "Cardiology, neurology, orthopedics & more.", variant: "coral" },
    { icon: <BookOpen size={22} />, title: "Anywhere, anytime", desc: "Mobile-first learning that fits your schedule.", variant: "purple" },
    { icon: <Sparkles size={22} />, title: "Simple & intuitive", desc: "Clean interface focused on your learning.", variant: "amber" },
  ];

  return (
    <>
      <section className="home-hero">
        <div className="blob animate-blob" style={{ background: 'hsl(184 76% 50%)', width: 500, height: 500, top: -100, left: -100 }} />
        <div className="blob animate-blob" style={{ background: 'hsl(8 85% 65%)', width: 400, height: 400, bottom: -100, right: -100, animationDelay: '3s' }} />
        <div className="container-x px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-fade-up">
            <span className="eyebrow"><Sparkles size={14} className="inline mr-1" /> For modern healthcare</span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] mb-6">
              Empowering Doctors with <span className="gradient-text">Knowledge & Growth</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Access videos, images, seminars, and structured content designed for modern healthcare professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary">Get Started <ArrowRight size={18} /></Link>
              <Link to="/login" className="btn-ghost">Login</Link>
            </div>
            <div className="flex items-center gap-6 mt-10">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/80?img=${i+10}`} alt="" className="w-10 h-10 rounded-full border-2 border-white" loading="lazy"/>
                ))}
              </div>
              <div>
                <div className="flex text-amber-400">{[...Array(5)].map((_,i) => <Star key={i} size={16} fill="currentColor"/>)}</div>
                <div className="text-sm text-muted-foreground">Trusted by {formatNumber(stats.totalDoctors)} doctors</div>
              </div>
            </div>
          </div>
          <div className="relative animate-float">
            <div className="absolute inset-0 gradient-hero rounded-[40px] rotate-6 opacity-20"></div>
            <img src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&q=80" alt="Doctors learning together" className="relative rounded-[40px] shadow-glow w-full" loading="eager" width={900} height={700} />
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-card flex items-center gap-3">
              <div className="icon-bubble coral !w-12 !h-12 !text-xl !mb-0">⚕️</div>
              <div>
                <div className="font-bold">Live Seminar</div>
                <div className="text-xs text-muted-foreground">Cardiology Today</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 shadow-card">
              <div className="text-3xl font-extrabold gradient-text">98%</div>
              <div className="text-xs text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x text-center max-w-3xl">
          <span className="eyebrow">What is DoctorHub</span>
          <h2 className="section-title">A digital home for continuous medical learning</h2>
          <p className="text-lg text-muted-foreground mb-4">
            DoctorHub is a digital learning platform where doctors can access curated medical content anytime, anywhere.
          </p>
          <p className="text-lg text-muted-foreground">
            We simplify continuous learning through visual, interactive, and practical resources.
          </p>
        </div>
      </section>

      <section className="section !py-12">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-6">
          {dynamicStats.map((s, index) => (
            <div key={index} className="feature-card text-center">
              <div className="text-4xl font-extrabold gradient-text">{s.n}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-gradient-to-b from-transparent to-[hsl(200_30%_97%)]">
        <div className="container-x">
          <SectionHeader eyebrow="What you get" title="Everything you need to keep growing" subtitle="Curated formats designed around how doctors actually learn." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map(o => <FeatureCard key={o.title} {...o} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" alt="Doctor reviewing content" className="rounded-3xl shadow-card w-full" loading="lazy" width={800} height={600}/>
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 shadow-coral max-w-[200px]">
              <Award className="text-[hsl(8_85%_65%)] mb-1" />
              <div className="font-bold text-sm">Verified content</div>
              <div className="text-xs text-muted-foreground">Curated by experts</div>
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Why choose us" title="Built around busy doctors" center={false} />
            <div className="space-y-5">
              {reasons.map(r => (
                <div key={r.title} className="flex gap-4">
                  <div className={`icon-bubble ${r.variant}`} style={{ width: 48, height: 48, minWidth: 48, minHeight: 48 }}>
                    {r.icon}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{r.title}</div>
                    <div className="text-muted-foreground">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-[hsl(200_30%_97%)] to-transparent">
        <div className="container-x">
          <SectionHeader eyebrow="Loved by doctors" title="Real stories from our community" />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Dr. Reddy", role: "General Physician", q: "DoctorHub improved my daily practice understanding.", img: 33 },
              { name: "Dr. Priya", role: "Cardiologist", q: "The seminar content is very useful — practical and easy to follow.", img: 47 },
            ].map(t => (
              <div key={t.name} className="feature-card">
                <div className="flex text-amber-400 mb-3">{[...Array(5)].map((_,i)=><Star key={i} size={16} fill="currentColor"/>)}</div>
                <p className="text-lg mb-5">“{t.q}”</p>
                <div className="flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/80?img=${t.img}`} alt={t.name} className="w-12 h-12 rounded-full" loading="lazy"/>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="home-cta">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full animate-blob"/>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/10 rounded-full animate-blob" style={{animationDelay:'2s'}}/>
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Start your learning journey today.</h2>
              <p className="text-white/90 mb-8 text-lg">Join thousands of doctors growing every day with DoctorHub.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/register" className="btn-coral">Register</Link>
                <Link to="/services" className="btn-ghost">Explore Content</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}