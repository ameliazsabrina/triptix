import Header from "@/components/header";
import DestinationPage from "./(landingpage)/destination";
import Landing from "./(landingpage)/landing";
import AbroadPage from "./(landingpage)/abroad";
import PricingPage from "./(landingpage)/pricing";
import CallPage from "./(landingpage)/call";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Landing />
      <DestinationPage />
      <AbroadPage />
      <PricingPage />
      <CallPage />
      <Footer />
    </div>
  );
}
