function Footer () {
  return (
    <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <a className="brand" href="#top">
          <img src="assets/robotbobby-logo-128.png" alt="" />
          <span className="brand-name">Bobby Roe</span>
        </a>
        <p>Creative developer. Aikido nut job. I make learning hard stuff fun.</p>
      </div>
      <div className="footer-col">
        <h5>Learn</h5>
        <ul>
          <li><a href="coaching.html">Coaching</a></li>
          <li><a href="https://robotbobby.thinkific.com/courses/learn-threejs-basics" target="_blank"
            >Course</a></li>
          <li><a href="https://www.youtube.com/@robotbobby9" target="_blank">YouTube</a></li>
          <li><a href="https://github.com/bobbyroe" target="_blank">GitHub</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>Support</h5>
        <ul>
          <li><a href="https://www.patreon.com/c/RobotBobby" target="_blank">Patreon</a></li>
          <li><a href="https://bobbyroe-shop.fourthwall.com/" target="_blank">Merch</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>Elsewhere</h5>
        <ul>
          <li><a href="https://www.linkedin.com/in/bobbyroe/" target="_blank">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© Bobby Roe</span>
      <span>Built with Three.js · WebGPU</span>
    </div>
  </footer>
  )
}

export default Footer