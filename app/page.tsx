import Hero from '@/components/home/Hero'
import TrustBar from '@/components/home/TrustBar'
import Programs from '@/components/home/Programs'
import Process from '@/components/home/Process'
import ComplianceSection from '@/components/home/ComplianceSection'
import FAQ from '@/components/home/FAQ'
import Contact from '@/components/home/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="py-8 md:py-12">
        <TrustBar />
      </div>
      <div className="py-8 md:py-16">
        <Programs />
      </div>
      <div className="py-8 md:py-16">
        <Process />
      </div>
      <div className="py-8 md:py-16">
        <ComplianceSection />
      </div>
      <div className="py-8 md:py-16">
        <FAQ />
      </div>
      <div className="py-8 md:py-16 mb-12 md:mb-16">
        <Contact />
      </div>
    </main>
  )
}
