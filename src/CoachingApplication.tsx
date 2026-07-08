import type { FormEvent } from "react"

function CoachingApplication() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <section className="section" id="apply">
      <div className="section-head"><h2 className="section-title">Application</h2></div>
      <div className="form-wrap">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="full">What are you building / what's your goal?
              <textarea placeholder="e.g. a portfolio piece with a 3D hero, a product configurator, a small game prototype…" />
            </label>
            <label>Experience level
              <select>
                <option>New to Three.js</option>
                <option>Comfortable with the basics</option>
                <option>Built a few things, want senior review</option>
                <option>Advanced / specific problem</option>
              </select>
            </label>
            <label>Portfolio or code link
              <input type="url" placeholder="https://" />
            </label>
            <label className="full">What would make this a win for you in 3 months?
              <textarea placeholder="Be specific — a shipped project, a job offer, a skill unlocked…" />
            </label>
          </div>
          <div className="form-submit">
            <button className="btn btn-primary" type="submit">Submit application →</button>
            <span className="form-note">I read every application personally.</span>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CoachingApplication
