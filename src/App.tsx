import Testimonials from "./Testimonials.tsx"
import Course from "./Course.tsx"
import HeroBackground from "./HeroBackground.tsx"
import HeroHeader from "./HeroHeader.tsx"
import IntroCard from "./IntroCard.tsx"
import Nav from "./Nav.tsx"
import VideoFeature from "./VideoFeature.tsx"
import Footer from "./Footer.tsx"

function App() {
  return (
    <>
      <HeroBackground />
      <Nav />
      <HeroHeader />
      <IntroCard />
      <Course />
      <Testimonials />
      <VideoFeature />
      <Footer />
    </>
  )
}

export default App