function HeroHeader() {
  return (
    <header className="hero" id="top">
      <div>
        <div className="eyebrow">
          <a className="section-link" href="https://www.youtube.com/@robotbobby9" target="_blank">YouTube.com / @robotbobby9</a>
        </div>
        <h1>Turn your ideas into<br />stunning <em>3D&nbsp;on the&nbsp;web</em></h1>
        <p className="lede">Learn to create real-time 3D goodness with Three.js.
          Tutorials, experiments, and inspiring content.</p>
        <div className="cta-row">
          <a className="btn btn-primary" href="https://robotbobby.thinkific.com/courses/learn-threejs-basics" target="_blank"
          >
            Start the course <span className="arrow">→</span>
          </a>
          <a className="btn btn-ghost" href="https://www.youtube.com/@robotbobby9" target="_blank">
            Watch on YouTube
          </a>
        </div>
        <div className="hero-meta">
          <div><b>20+ yrs</b>creative dev</div>
          <div><b>150+</b>tutorials</div>
          <div><b>11k+</b>students &amp; subs</div>
        </div>
      </div>
    </header>
  )
}
export default HeroHeader