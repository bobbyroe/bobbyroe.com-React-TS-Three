function Offerings() {
  return (
    <section className="section" id="offerings">
      <div className="section-head"><h2 className="section-title">Offerings</h2></div>
      <div className="offer-grid">
        <div className="offer-card">
          <span className="tag">Single Session</span>
          <h3>45-Minute Session</h3>
          <div className="price">$250</div>
          <ul><li>Project review</li><li>Live debugging</li><li>Portfolio building</li></ul>
        </div>
        <div className="offer-card">
          <span className="tag">Ongoing</span>
          <h3>4-Session Package</h3>
          <div className="price">$900<span className="price-unit">/mo</span></div>
          <ul><li>Weekly check-ins</li><li>Momentum on a real project</li><li>Priority async questions</li></ul>
        </div>
        <div className="offer-card">
          <span className="tag">Intensive</span>
          <h3>Skill Sprint</h3>
          <div className="price">Custom</div>
          <ul><li>Focused multi-week push</li><li>From stuck to shipping</li><li>Scoped to your goal</li></ul>
        </div>
      </div>
    </section>
  )
}

export default Offerings
