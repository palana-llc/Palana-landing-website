const stats = [
  { percent: "47.2%", color: "#CC4728", label: "Somewhat unsafe" },
  { percent: "24.5%", color: "#F29D39", label: "Neutral" },
  { percent: "13.2%", color: "#459331", label: "Somewhat safe" },
  { percent: "13.2%", color: "#3E68C5", label: "Very unsafe" },
  { percent: "1.9%", color: "#8C2194", label: "Very safe" },
];

export default function SafetyStats() {
  return (
    <div className="safety-stats-container">
      <h2 className="impact-title">How safe do you feel</h2>
      <p className="impact-subtitle">walking alone at night near campus?</p>
      <ul className="safety-stats-list">
        {stats.map(({ percent, color, label }) => (
          <li key={label} className="safety-stats-item">
            <span className="safety-stats-percent" style={{color: color}}>{percent}</span>
            <span className="safety-stats-label" style={{color: color}}>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
