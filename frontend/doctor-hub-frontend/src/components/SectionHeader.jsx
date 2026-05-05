export default function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`${center ? "text-center" : ""} mb-12 animate-fade-up`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}