import { useEffect, useRef, useState } from 'react'

export function SpriteAnimator({ src, columns, rows, fps = 8, fallbackSrc, className, label }) {
  const canvasRef = useRef(null)
  const [loadedSrc, setLoadedSrc] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sheet = new Image()
    const frameCount = columns * rows
    let frame = 0
    let frameWidth
    let frameHeight
    let timer
    let inViewport = false

    function drawFrame() {
      const column = frame % columns
      const row = Math.floor(frame / columns)

      context.clearRect(0, 0, canvas.width, canvas.height)
      // Keep the source cells fractional and round only the canvas dimensions.
      context.drawImage(
        sheet,
        column * frameWidth,
        row * frameHeight,
        frameWidth,
        frameHeight,
        0,
        0,
        canvas.width,
        canvas.height,
      )
    }

    function syncPlayback() {
      window.clearInterval(timer)

      if (!frameWidth) return

      if (motion.matches) {
        if (frame !== 0) {
          frame = 0
          drawFrame()
        }
      } else if (inViewport && !document.hidden) {
        timer = window.setInterval(() => {
          frame = (frame + 1) % frameCount
          drawFrame()
        }, 1000 / fps)
      }
    }

    sheet.onload = () => {
      frameWidth = sheet.naturalWidth / columns
      frameHeight = sheet.naturalHeight / rows
      canvas.width = Math.round(frameWidth)
      canvas.height = Math.round(frameHeight)
      drawFrame()
      setLoadedSrc(src)
      syncPlayback()
    }

    const observer = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting
      syncPlayback()
    })
    observer.observe(canvas)
    motion.addEventListener('change', syncPlayback)
    document.addEventListener('visibilitychange', syncPlayback)
    sheet.src = src

    return () => {
      window.clearInterval(timer)
      observer.disconnect()
      motion.removeEventListener('change', syncPlayback)
      document.removeEventListener('visibilitychange', syncPlayback)
      sheet.onload = null
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [src, columns, rows, fps])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={fallbackSrc && loadedSrc !== src
        ? { background: `center / contain no-repeat url("${fallbackSrc}")` }
        : undefined}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}
