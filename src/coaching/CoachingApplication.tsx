import { useState } from "react"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdarqnkb";
const CAL_COM_URL = "https://cal.com/bobby-roe-uqjy1o/disco"

type SubmitStatus = "idle" | "submitting" | "success" | "error"

function CoachingApplication() {
  const [status, setStatus] = useState<SubmitStatus>("idle")

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus("submitting")

    try {
      const data = new FormData(form)
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })

      if (!res.ok) throw new Error("submission failed")
      setStatus("success")

      const notes = [
        `Goal: ${data.get("goal")}`,
        `Stuck on: ${data.get("stuck")}`,
      ].join("\n")
      const params = new URLSearchParams({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        notes,
      })

      setTimeout(() => {
        window.location.href = `${CAL_COM_URL}?${params.toString()}`
      }, 1500)
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="section" id="apply">
      <div className="section-head"><h2 className="section-title">Book a Discovery Call</h2></div>
      <div className="form-wrap">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>Name
              <input type="text" name="name" required placeholder="Jane Doe" />
            </label>
            <label>Email
              <input type="email" name="email" required placeholder="jane@example.com" />
            </label>
            <label className="full">What are you building / what's your goal?
              <textarea name="goal" required placeholder="e.g. a portfolio piece with a 3D hero, a product configurator, a small game prototype…" />
            </label>
            <label>Experience level
              <select name="experience">
                <option>New to Three.js</option>
                <option>Comfortable with the basics</option>
                <option>Built a few things, want senior review</option>
                <option>Advanced / specific problem</option>
              </select>
            </label>
            <label>Portfolio or code link
              <input type="url" name="portfolio" placeholder="https://" />
            </label>
            <label className="full">What are you stuck on right now?
              <textarea name="stuck" placeholder="Describe the challenges or obstacles you're facing…" />
            </label>
            <label className="full">What would make this a win for you in 3 months?
              <textarea name="goal_3mo" required placeholder="Be specific — a shipped project, a job offer, a skill unlocked…" />
            </label>
          </div>
          <div className="form-submit">
            <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Submit & schedule →"}
            </button>
            <span className="form-note">
              {status === "success"
                ? "Got it — redirecting you to scheduling…"
                : status === "error"
                ? "Something went wrong — please try again or email me directly."
                : "I read every application personally."}
            </span>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CoachingApplication
