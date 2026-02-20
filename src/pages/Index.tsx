import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EnvironmentSetup from "@/components/EnvironmentSetup";
import DocumentationTemplate from "@/components/DocumentationTemplate";
import DataManagement from "@/components/DataManagement";
import ReproducibilityChecker from "@/components/ReproducibilityChecker";
import ImpactSection from "@/components/ImpactSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <EnvironmentSetup />
      <DocumentationTemplate />
      <DataManagement />
      <ReproducibilityChecker />
      <ImpactSection />
      <CommunitySection />
      <Footer />
    </div>
  );
}
