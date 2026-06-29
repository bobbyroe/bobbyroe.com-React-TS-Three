import { useState } from "react"

function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(
        "https://buttondown.com/api/emails/embed-subscribe/roe",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ email, embed: "1" }),
        }
      )
      if (res.ok) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="newsletter section">
      <div className="newsletter-inner">
        {status === "success" ? (
          <p className="newsletter-confirm">You're in! Check your inbox to confirm.</p>
        ) : (
          <>
            <h2 className="newsletter-heading">Stay in the loop</h2>
            <p className="newsletter-sub">
              Get Three.js tips, project breakdowns, and new tutorial alerts. No spam, unsubscribe anytime.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                className="newsletter-input"
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === "loading"}
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </form>
            {status === "error" && (
              <p className="newsletter-error">Something went wrong — try again.</p>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default NewsletterSignup
