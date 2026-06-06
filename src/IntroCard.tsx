import { useEffect, useRef, useState } from "react"

type Segment = { text: string; bold?: boolean; muted?: boolean }

const SEGMENTS: Segment[] = [
  { text: "I'm " },
  { text: "Bobby Roe", bold: true },
  { text: ". I make videos about coding, art, and technology — and I'm here to help on your coding journey." },
  { text: " With 20+ years as a creative developer; I've helped thousands learn to code and create art.", muted: true },
]

type Token = { text: string; segIndex: number }

const TOKENS: Token[] = SEGMENTS.flatMap((seg, i) =>
  (seg.text.match(/\S+\s*/g) ?? []).map(text => ({ text, segIndex: i }))
)

function renderTokens(count: number) {
  return TOKENS.slice(0, count).map((token, i) => {
    const seg = SEGMENTS[token.segIndex];
    if (seg.bold) return <b key={i} className="word-reveal">{token.text}</b>;
    if (seg.muted) return <span key={i} className="word-reveal muted">{token.text}</span>;
    return <span key={i} className="word-reveal">{token.text}</span>;
  });
}

function IntroCard() {
  const ref = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || count >= TOKENS.length) return;
    const id = setTimeout(() => setCount(c => c + 1), 60);
    return () => clearTimeout(id);
  }, [started, count]);

  return (
    <section className="intro" ref={ref}>
      <div className="intro-card">
        <img src="assets/robotbobby-logo-128.png" alt="" />
        <p>
          {renderTokens(count)}
          {count < TOKENS.length && <span className="typewriter-cursor">|</span>}
        </p>
      </div>
    </section>
  )
}

export default IntroCard
