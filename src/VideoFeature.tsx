function VideoFeature() {
  return (
    <section className="section" id="video">
      <div className="section-head">
        <span className="section-num">03 /</span>
        <h2 className="section-title">Latest from YouTube</h2>
        <a className="section-link" href="https://www.youtube.com/@robotbobby9" target="_blank">Channel</a>
      </div>

      <div className="video-grid">
        <div className="video-frame">
          <iframe src="https://www.youtube-nocookie.com/embed?listType=playlist&list=UU6tSVj7pAlao-jfpka298Iw"
            title="Latest from Robot Bobby" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen></iframe>
        </div>
        <aside className="video-side">
          <h4>This week</h4>
          <div className="topic">Insane performance with Three.js — #threejs #webgpu #javascript</div>
          <div className="sub-meta"><span><b>Robot Bobby</b></span><span>New videos weekly</span></div>
          <a className="subscribe" href="https://www.youtube.com/@robotbobby9?sub_confirmation=1" target="_blank"
          >
            ▶ Subscribe
          </a>
        </aside>
      </div>
    </section>
  )
}

export default VideoFeature