export default function FeatureCard({ icon, title, desc, variant = "default" }) {
  return (
    <div className="feature-card">
      <div className={`icon-bubble ${variant !== "default" ? variant : ""}`}>{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  );
}