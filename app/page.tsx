import Hero from "@/components/hero"
import Services from "@/components/services"
import AITechnology from "@/components/ai-technology"
import IndustrySolutions from "@/components/industry-solutions"
import Portfolio from "@/components/portfolio"
import Process from "@/components/process"
import Team from "@/components/team"
import Contact from "@/components/contact"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <AITechnology />
      <IndustrySolutions />
      <Portfolio />
      <Process />
      <Team />
      <Contact />
      <Footer />
    </main>
  )
}
