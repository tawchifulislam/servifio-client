import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { LiveTicker } from '@/components/live-ticker';
import { CategoryStrip } from '@/components/category-strip';
import { HowItWorks } from '@/components/how-it-works';
import { FeaturedServices } from '@/components/featured-services';
import { Testimonials } from '@/components/testimonials';
import { TrustStats } from '@/components/trust-stats';
import { CtaBanner } from '@/components/cta-banner';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="dark bg-background">
      <Navbar />
      <Hero />
      <LiveTicker />
      <CategoryStrip />
      <HowItWorks />
      <FeaturedServices />
      <Testimonials />
      <TrustStats />
      <CtaBanner />
      <Footer />
    </div>
  );
}
