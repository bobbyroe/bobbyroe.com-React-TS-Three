function Course() {
  return (
    <section className="section" id="course">
      <div className="section-head">
        <span className="section-num">01 /</span>
        <h2 className="section-title">Course</h2>
        <a className="section-link" href="https://robotbobby.thinkific.com/courses/learn-threejs-basics" target="_blank"
        >Open on Thinkific</a>
      </div>

      <div className="course-grid">
        <a className="course-poster" href="https://robotbobby.thinkific.com/courses/learn-threejs-basics" target="_blank"
        >
          <span className="badge">Enrollment open</span>
          <img src="assets/LearnThree-900.jpg" alt="Learn Three.js Basics course poster" />
        </a>

        <div className="course-body">
          <h3>Learn Three.js — the Basics</h3>
          <p className="tagline">An overview of Three.js for coders &amp; artists who want more than “Hello World” but aren't
            ready for advanced shader black magic — yet.</p>

          <ul className="course-features">
            <li>Build complete interactive 3D scenes from scratch</li>
            <li>Lighting, materials &amp; geometry — without the math overload</li>
            <li>Optimizations, performance tips & best practices</li>
            {/* <li>Lifetime access &amp; a private community to ask questions in</li> */}
          </ul>

          <div className="course-cta">
            <a className="btn btn-primary" href="https://robotbobby.thinkific.com/courses/learn-threejs-basics"
              target="_blank">
              Enroll now <span className="arrow">→</span>
            </a>
            <span className="course-meta">Self-paced · Code along</span>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Course