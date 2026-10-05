import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import DataLayerSection from '@/components/DataLayerSection';
import PacketContextSection from '@/components/PacketContextSection';
import AIInteractionSection from '@/components/AIInteractionSection';
import SecuritySection from '@/components/SecuritySection';
import ScaleSection from '@/components/ScaleSection';
import EngineeringServicesSection from '@/components/EngineeringServicesSection';
import CompanySection from '@/components/CompanySection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-warm selection:bg-accent-orange/30">
      <Navigation />
      <Hero />
      <ProblemSection />
      <DataLayerSection />
      <PacketContextSection />
      <AIInteractionSection />
      <SecuritySection />
      <ScaleSection />
      <EngineeringServicesSection />
      <CompanySection />
      <Footer />
    </main>
  );
}
