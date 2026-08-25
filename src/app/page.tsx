import {
  FaqSection,
  FinalPanel,
  GrowthSection,
  HeroSection,
  PlansSection,
  PreviewSection,
  PrivacySection,
  SiteFooter,
  SiteHeader,
  TensionSection,
} from '@/components/SiteSections';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <TensionSection />
        <GrowthSection />
        <PreviewSection />
        <PrivacySection />
        <PlansSection />
        <FaqSection />
        <FinalPanel />
      </main>
      <SiteFooter />
    </>
  );
}
