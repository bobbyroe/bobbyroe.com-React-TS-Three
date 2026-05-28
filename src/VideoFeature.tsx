import { useEffect, useState } from "react"

type VideoData = {
  title: string;
  html: string;
}

function VideoFeature() {

  const videoUrls = [
    'https://youtu.be/rrUqNAjmwCY', // Rise
    'https://youtu.be/XPhAR1YdD6o', // Getting Started
    'https://youtu.be/T6A-K9uLdIU', // WebGPU
    'https://youtu.be/M7ARBA3EcZI', // Roadmap
    'https://youtu.be/f4zncVufL_I', // 3D Globe
    'https://youtu.be/63o2gHHgeH4', // 20+ Projects
    'https://youtu.be/sVz-HV2myjQ', // TSL
    'https://youtu.be/RSV7_f5dJhM', // Textures
    'https://youtu.be/JGpfwvX0iCY', // Realistic
    'https://youtu.be/LDKlZmAqpHw', // R3F Earth
    'https://youtu.be/ckaizd-tZtI' // AI Agents
  ];
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  useEffect(() => {
    const fetchRandomVideoData = async () => {
      const videoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
      const res = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`
      );
      return res.json();
    };
    fetchRandomVideoData().then(data => setVideoData({ html: data.html, title: data.title }));
  }, []);

  return (
    <section className="section" id="video">
      <div className="section-head">
        <span className="section-num">03 /</span>
        <h2 className="section-title">Featured from YouTube</h2>
        <a className="section-link" href="https://www.youtube.com/@robotbobby9" target="_blank">Channel</a>
      </div>

      <div className="video-grid">
        {videoData ? (
          <div className="video-frame" dangerouslySetInnerHTML={{ __html: videoData.html }} />
        ) : (
          <div>Loading...</div>
        )}
        <aside className="video-side">
          <h4>Classic</h4>
          <div className="topic">{videoData?.title}</div>
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