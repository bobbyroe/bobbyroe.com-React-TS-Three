function CoachingPricing() {
  return (
    <section className="section" id="pricing">
      <div className="section-head"><h2 className="section-title">Pricing &amp; options</h2></div>
      <div className="pricing-grid">
        <div className="price-card">
          <h4>Single Session</h4>
          <div className="amt">$250 <span>/ 45 min</span></div>
          <p>Best for a one-off review, a stuck bug, or portfolio feedback.</p>
          <a className="btn btn-ghost" href="https://cal.com/bobby-roe-uqjy1o/disco" target="_blank" rel="noreferrer">Book</a>
        </div>
        <div className="price-card featured">
          <span className="badge">Most popular</span>
          <h4>4-Session Package</h4>
          <div className="amt">$900 <span>/ month</span></div>
          <p>Best for building real momentum on a project with a standing check-in.</p>
          <a className="btn btn-primary" href="https://cal.com/bobby-roe-uqjy1o/disco" target="_blank" rel="noreferrer">Book</a>
        </div>
        <div className="price-card">
          <h4>Skill Sprint</h4>
          <div className="amt">Custom</div>
          <p>Best for a scoped, multi-week intensive with a specific 3-month goal.</p>
          <a className="btn btn-ghost" href="#apply">Apply</a>
        </div>
      </div>
    </section>
  )
}

export default CoachingPricing
