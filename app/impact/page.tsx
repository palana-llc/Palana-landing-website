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
        <SafetyStats />
        <EfficiencyChart />
        <AppLikelihoodChart />
      </div>
      <Footer />
    </div>
  );
}
