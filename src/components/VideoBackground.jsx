import { useState } from 'react'

export default function VideoBackground({ src, poster }) {
  const [hasVideo, setHasVideo] = useState(!!src)
  const [loaded, setLoaded] = useState(false)

  if (!hasVideo) {
    // No video provided yet — parent's blueprint-grid background shows through
    return null
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      onCanPlay={() => setLoaded(true)}
      onError={() => setHasVideo(false)}
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
        loaded ? 'opacity-40' : 'opacity-0'
      }`}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}