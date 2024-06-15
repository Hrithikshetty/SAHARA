import Features from "@/components/Features";
import GetApp from "@/components/GetApp";
import Guide from "@/components/Guide";
import Hero from "@/components/Hero";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


export default function Home() {
  return (
    <>
    <Navbar />
      <Hero />
      <Guide />
      <Features />
      <GetApp />
      <Footer />
    </>
  )
}

