import React from "react";
import { SafetyGapCard, type SafetyGapItem } from "./SafetyGapCard";
import "../css/safety-gaps.css";

const GAPS: SafetyGapItem[] = [
  {
    title: "Limited transparency for riders",
    description:
      "Many campus safety services rely on phone-based ride requests, leaving students without clear visibility into driver location, pickup timing, or ride status. This uncertainty increases stress and leads to missed connections.",
    backTitle: "Real-Time Visibility",
    backDescription:
      "Students are able to track their driver in real time, view live ETAs for both pickup and dropoff, and navigate to their pickup location with an in-app map. No guessing, no waiting in the dark.",
  },
  {
    title: "Fragmented and unreliable communication",
    description:
      "Phone systems offer little flexibility for real-time updates. If plans change or issues arise, there is no seamless way for riders and drivers to stay in sync.",
    backTitle: "Seamless Communication",
    backDescription:
      "Palana gives students and drivers a built-in chat and call system to locate each other at pickup, all within the app, with encrypted messages and protected phone numbers, so communication is seamless and secure.",
  },
  {
    title: "Outdated, inefficient infrastructure",
    description:
      "Legacy systems create unnecessary operational overhead for campus safety teams, making it difficult to manage rides, track usage, and scale services effectively.",
    backTitle: "Modern Infrastructure",
    backDescription:
      "Palana's dispatch dashboard gives campus safety teams a live view of all active rides, pending requests, and student wait times, making it easy to manage, monitor, and scale the service without the chaos of legacy systems.",
  },
  {
    title: "Dispatcher overload and misallocated resources",
    description:
      "Routing all ride requests through phone calls places an unnecessary burden on dispatchers—often campus security or police personnel—diverting attention from higher-priority safety responsibilities.",
    backTitle: "Smarter Dispatching",
    backDescription:
      "Students request rides directly through the app, removing the need to call dispatch entirely. When calls do come in, dispatchers can input requests through a simple form, freeing up security personnel to focus on what matters most.",
  },
];

export const SafetyGaps = (): React.ReactElement => (
  <section
    className="safety-gaps-section"
    id="safety-gaps"
    aria-labelledby="safety-gaps-heading"
  >
    <div className="nav-container">
      <div className="safety-gaps-content">
        <header className="safety-gaps-header">
          <h2 id="safety-gaps-heading" className="safety-gaps-heading">
            Current campus safety systems fall short in a couple of key ways:
          </h2>
          {/* <p className="safety-gaps-intro">
            Campus safety is only as strong as the tools behind it.
          </p> */}
        </header>
        <ul className="safety-gaps-list">
          {GAPS.map((item, index) => (
            <SafetyGapCard key={item.title} item={item} index={index} />
          ))}
        </ul>
      </div>
    </div>
  </section>
);
