import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { CategoryStrip } from '@/components/category-strip';
import { HowItWorks } from '@/components/how-it-works';

export default function Home() {
  return (
    <div className="dark bg-background">
      <Navbar />
      <Hero />
      <CategoryStrip />
      <HowItWorks />
    </div>
  );
}
