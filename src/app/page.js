import Header from "@/components/header";
import DestinationPage from "./(landingpage)/Destination";
import Landing from "./(landingpage)/Landing";
import AbroadPage from "./(landingpage)/Abroad";
import PricingPage from "./(landingpage)/Pricing";
import CallPage from "./(landingpage)/Call";
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
