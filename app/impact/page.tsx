"use client";

import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import SafetyStats from './components/SafetyStats';
import EfficiencyChart from './components/EfficiencyChart';
import AppLikelihoodChart from './components/AppLikelihoodChart';

export default function ImpactPage() {
  return (
    <div>
      <Navbar />
      <div className="impact-page">
        <div className="impact-header-container">
          <p className="impact-title" style={{fontSize: "clamp(42px, 9vw, 85px)"}}>
            Palana&apos;s Impact
          </p>
          <p className="impact-subtitle" style={{fontSize: "clamp(22px, 4vw, 40px)"}}>
            See how Palana is making a difference in campus safety.
          </p>
        </div>
        <SafetyStats />
        <EfficiencyChart />
        <AppLikelihoodChart />
      </div>
      <Footer />
    </div>
  );
}
