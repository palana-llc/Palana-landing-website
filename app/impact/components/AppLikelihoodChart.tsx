"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  type BarShapeProps,
} from "recharts";

const data = [
  { response: "Definitely", count: 45, fill: "#3E68C5" },
  { response: "Maybe", count: 30, fill: "#CC4728" },
  { response: "Probably not", count: 25, fill: "#F29D39" },
  { response: "Not at all", count: 20, fill: "#459331" },
];

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
};

function RoundedBar(props: Props) {
  const { x, y, width, height, fill } = props;
  const r = 4;
  return (
    <path
      d={`M${x},${y + height} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height} Z`}
      fill={fill}
    />
  );
}

export default function AppLikelihoodChart() {
  return (
    <div className="app-likelihood-container">
      <p className="impact-title">
        If Husky SafeRide had an app like Uber,
      </p>
      <p className="impact-subtitle">
        would you be more likely to use it?
      </p>
      <div className="app-likelihood-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            barCategoryGap="25%"
            margin={{ top: 20, right: 10, left: 10, bottom: 30 }} 
          >
            <XAxis
              dataKey="response"
              axisLine={true}
              tickLine={false}
              strokeWidth={8}
              stroke="#353535"
              tick={{
                fontSize: "clamp(16px, 4vw, 40px)",
                fontWeight: 800,
                fontFamily: "Raleway, sans-serif",
                fill: "#353535",
              }}
              interval="preserveStartEnd"
              tickMargin={10}
            />
            <YAxis
              axisLine={true}
              tickLine={false}
              strokeWidth={8}
              stroke="#353535"
              tick={{
                fontSize: "clamp(16px, 4vw, 40px)",
                fontWeight: 800,
                fontFamily: "Raleway, sans-serif",
                fill: "#353535",
              }}
              tickMargin={10}
            />
            <Tooltip />
            <Bar dataKey="count" shape={(props: BarShapeProps) => <RoundedBar {...props} />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
