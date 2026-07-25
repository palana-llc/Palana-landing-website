"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  {
    somewhat_easy: 42.9,
    somewhat_difficult: 28.6,
    neutral: 14.3,
    very_difficult: 14.3,
  },
];

const segments = [
  { key: "somewhat_easy", color: "#459331", label: "Somewhat easy" },
  { key: "somewhat_difficult", color: "#CC4728", label: "Somewhat difficult" },
  { key: "neutral", color: "#F29D39", label: "Neutral" },
  { key: "very_difficult", color: "#3E68C5", label: "Very difficult" },
];

export default function EfficiencyChart() {
  return (
    <div className="efficiency-chart-container">
      <h2 className="impact-title" style={{textAlign: "left"}}>
        How efficient is it to request a SafeTrip ride?
      </h2>
      <div className="efficiency-chart">
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={data} layout="vertical" barSize={"100%"}>
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis type="category" hide />
            <Tooltip formatter={(value) => `${value}%`} />
            {segments.map(({ key, color, label }) => (
              <Bar key={key} dataKey={key} stackId="a" fill={color} name={label}>
                <LabelList
                  dataKey={key}
                  position="center"
                  formatter={(value) => `${value}%`}
                  style={{ fill: "#fff", fontWeight: 800, fontSize: "clamp(14px, 2.5vw, 25px)", fontFamily: "Raleway, sans-serif" }}
                />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* <ul className="efficiency-legend">
        {segments.map(({ key, color, label }) => (
          <li key={key} className="efficiency-legend-item">
            <span className="efficiency-legend-dot" style={{ background: color }} />
            {label}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
