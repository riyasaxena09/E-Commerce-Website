import { HeroBanner } from "../components/home/HeroBanner";
import { TrendingProducts } from "../components/home/TrendingProducts";
import { FeaturedCollections } from "../components/home/FeaturedCollections";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { NewsletterSection } from "../components/home/NewsletterSection";

export const HomePage: React.FC = () => {
  return (
    <main>
      <HeroBanner />
      <TrendingProducts />
      <FeaturedCollections />
      <FeaturesSection />
      <NewsletterSection />
    </main>
  );
};
