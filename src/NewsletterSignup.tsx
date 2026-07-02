function NewsletterSignup() {
  function handleSubmit() {
    window.open("https://buttondown.com/roe", "popupwindow")
  }

  return (
    <section className="newsletter section" id="newsletter">
      <div className="newsletter-inner">
        <h2 className="newsletter-heading">Stay in the loop</h2>
        <p className="newsletter-sub">
          Get Three.js tips, project breakdowns, and new tutorial alerts. No spam, unsubscribe anytime.
        </p>
        <p className="migration-guide-callout">
          Get the Three.js WebGL → WebGPU migration guide
        </p>
        <form
          className="newsletter-form"
          action="https://buttondown.com/api/emails/embed-subscribe/roe"
          method="post"
          target="popupwindow"
          onSubmit={handleSubmit}
        >
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            className="newsletter-input"
            type="email"
            name="email"
            required
            placeholder="your@email.com"
          />
          <input type="hidden" name="embed" value="1" />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

export default NewsletterSignup
