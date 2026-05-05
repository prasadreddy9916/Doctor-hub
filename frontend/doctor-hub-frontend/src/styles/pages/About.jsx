import SectionHeader from "../components/SectionHeader.jsx";
import { Target, Eye, Heart, Award } from "lucide-react";
import "../styles/about.css";

export default function About() {
  return (
    <>
      <section className="about-hero">
        <div className="blob animate-blob" style={{ background: 'hsl(184 76% 50%)', width: 500, height: 500, top: -100, right: -100 }} />
        <div className="container-x grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-fade-up">
            <span className="eyebrow">About DoctorHub</span>
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">A platform built to help doctors <span className="gradient-text">never stop learning</span></h1>
            <p className="text-lg text-muted-foreground">DoctorHub is built to support doctors in continuous learning and professional growth.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=900&q=80" alt="Doctors collaborating" className="rounded-[32px] shadow-glow w-full" loading="eager" width={900} height={700}/>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeader eyebrow="What makes us different" title="Beyond a single specialization" subtitle="We bring quality learning to every kind of doctor." />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="feature-card">
              <div className="icon-bubble">🌐</div>
              <h3 className="text-xl font-bold mb-2">Not limited to one field</h3>
              <p className="text-muted-foreground">We are not limited to one specialization. Every doctor finds value here.</p>
            </div>
            <div className="feature-card">
              <div className="icon-bubble coral">🩺</div>
              <h3 className="text-xl font-bold mb-2">All types of doctors</h3>
              <p className="text-muted-foreground">We support cardiology, neurology, orthopedics, pediatrics, dermatology and more.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-[hsl(200_30%_97%)] to-transparent">
        <div className="container-x grid md:grid-cols-2 gap-6">
          <div className="feature-card">
            <div className="icon-bubble purple"><Eye /></div>
            <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
            <p className="text-muted-foreground text-lg">To make medical learning accessible and continuous.</p>
          </div>
          <div className="feature-card">
            <div className="icon-bubble amber"><Target /></div>
            <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
            <p className="text-muted-foreground text-lg">To provide high-quality digital resources for doctors worldwide.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeader eyebrow="Our values" title="What guides us" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Heart/>, t: "Care", d: "We design with doctors at heart." },
              { icon: <Award/>, t: "Quality", d: "Only verified, expert-led content." },
              { icon: <Target/>, t: "Focus", d: "Practical, no-fluff learning." },
              { icon: <Eye/>, t: "Vision", d: "A connected medical world." },
            ].map(v => (
              <div key={v.t} className="feature-card text-center">
                <div className="icon-bubble mx-auto">{v.icon}</div>
                <h3 className="text-lg font-bold mb-1">{v.t}</h3>
                <p className="text-muted-foreground text-sm">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}