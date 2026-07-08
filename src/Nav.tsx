function Nav() {
  return (
    <nav className="nav">
    <div className="nav-inner">
      <a className="brand" href="#top">
        <img src="assets/robotbobby-logo-128.png" alt="Robot Bobby" />
        <span className="brand-name">Bobby Roe</span>
      </a>
      <div className="nav-links">
        <a href="coaching.html">Coaching</a>
        <a href="#course">Course</a>
        <a href="#video">Videos</a>
        <a className="opt" href="https://github.com/bobbyroe" target="_blank">GitHub</a>
        <a className="opt" href="https://bobbyroe-shop.fourthwall.com/" target="_blank">Merch</a>
        <a href="https://www.patreon.com/c/RobotBobby" target="_blank">Patreon</a>
      </div>
    </div>
  </nav>
  )
}

export default Nav