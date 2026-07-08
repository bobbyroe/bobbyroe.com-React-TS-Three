import CoachingNav from "./CoachingNav.tsx"
import CoachingHero from "./CoachingHero.tsx"
import Offerings from "./Offerings.tsx"
import CoachingAbout from "./CoachingAbout.tsx"
import CoachingPricing from "./CoachingPricing.tsx"
import CoachingApplication from "./CoachingApplication.tsx"
import CoachingGuarantee from "./CoachingGuarantee.tsx"
import Footer from "../Footer.tsx"

function CoachingPage() {
  return (
    <>
      <CoachingNav />
      <CoachingHero />
      <Offerings />
      <CoachingAbout />
      <CoachingPricing />
      <CoachingApplication />
      <CoachingGuarantee />
      <Footer />
    </>
  )
}

export default CoachingPage
