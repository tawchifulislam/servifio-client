import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { CategoryStrip } from '@/components/category-strip';
import { HowItWorks } from '@/components/how-it-works';
import { FeaturedServices } from '@/components/featured-services';
import { TrustStats } from '@/components/trust-stats';
import { CtaBanner } from '@/components/cta-banner';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="dark bg-background">
      <Navbar />
      <Hero />
      <CategoryStrip />
      <HowItWorks />
      <FeaturedServices />
      <TrustStats />
      <CtaBanner />
      <Footer />
    </div>
  );
}
