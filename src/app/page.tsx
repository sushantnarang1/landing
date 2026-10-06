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
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-warm">
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
      
      {/* Added a high-impact CTA for the new Platform tools */}
      <section className="py-24 px-6 bg-bg-dark text-text-inverse text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Ready to harden your platform?</h2>
          <p className="text-neutral-400 text-lg mb-10">
            Explore the NarangOS Infrastructure Catalog and Platform Assessment Engine.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/infrastructure/catalog" className="bg-accent-orange text-bg-warm px-8 py-4 rounded-sm font-bold hover:opacity-90 transition-all">
              Explore Infrastructure
            </Link>
            <Link href="/assessments/overview" className="border border-neutral-700 px-8 py-4 rounded-sm font-bold hover:bg-neutral-800 transition-all">
              Run Platform Assessment
            </Link>
          </div>
        </div >
      </section>

      <Footer />
    </main>
  );
}
