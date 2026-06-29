import { useEffect, useRef } from "react"
import Testimonials from "./Testimonials.tsx"
import Course from "./Course.tsx"
import HeroBackground from "./HeroBackground.tsx"
import HeroHeader from "./HeroHeader.tsx"
import IntroCard from "./IntroCard.tsx"
import Nav from "./Nav.tsx"
import VideoFeature from "./VideoFeature.tsx"
import Footer from "./Footer.tsx"
import NewsletterSignup from "./NewsletterSignup.tsx"

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className="fade-in">{children}</div>;
}

function App() {
  return (
    <>
      <HeroBackground />
      <Nav />
      <FadeIn delay={600}><HeroHeader /></FadeIn>
      <FadeIn delay={800}><IntroCard /></FadeIn>
      <FadeIn delay={1000}><Course /></FadeIn>
      <FadeIn><Testimonials /></FadeIn>
      <FadeIn><VideoFeature /></FadeIn>
      <FadeIn><NewsletterSignup /></FadeIn>
      <FadeIn><Footer /></FadeIn>
    </>
  )
}

export default App
