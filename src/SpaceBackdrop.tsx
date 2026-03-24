import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  tw: number
  twSpeed: number
  base: number
}

function attachStarfield(canvas: HTMLCanvasElement): () => void {
  const c = canvas.getContext('2d')
  if (!c) return () => {}

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let stars: Star[] = []
  let cssW = 0
  let cssH = 0
  let dpr = 1

  const initStars = () => {
    const area = cssW * cssH
    const count = Math.min(260, Math.max(72, Math.floor(area / 13000)))
    stars = []
    for (let i = 0; i < count; i++) {
      const layer = i % 3
      const speed = layer === 0 ? 0.012 : layer === 1 ? 0.028 : 0.048
      stars.push({
        x: Math.random() * cssW,
        y: Math.random() * cssH,
        r: layer === 0 ? Math.random() * 0.75 + 0.25 : layer === 1 ? Math.random() * 0.95 + 0.45 : Math.random() * 1.1 + 0.55,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        tw: Math.random() * Math.PI * 2,
        twSpeed: reduced ? 0 : 0.015 + Math.random() * 0.028,
        base: 0.28 + Math.random() * 0.62,
      })
    }
  }

  const drawStatic = () => {
    c.clearRect(0, 0, cssW, cssH)
    for (const s of stars) {
      c.beginPath()
      c.fillStyle = `rgba(220, 230, 255, ${s.base})`
      c.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      c.fill()
    }
  }

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    cssW = window.innerWidth
    cssH = window.innerHeight
    canvas.width = Math.floor(cssW * dpr)
    canvas.height = Math.floor(cssH * dpr)
    canvas.style.width = `${cssW}px`
    canvas.style.height = `${cssH}px`
    c.setTransform(dpr, 0, 0, dpr, 0, 0)
    initStars()
    if (reduced) drawStatic()
  }

  resize()
  window.addEventListener('resize', resize)

  let raf = 0
  if (!reduced) {
    const tick = () => {
      c.clearRect(0, 0, cssW, cssH)
      for (const s of stars) {
        s.x += s.vx
        s.y += s.vy
        s.tw += s.twSpeed
        if (s.x < -4) s.x = cssW + 4
        if (s.x > cssW + 4) s.x = -4
        if (s.y < -4) s.y = cssH + 4
        if (s.y > cssH + 4) s.y = -4
        const twinkle = 0.62 + 0.38 * Math.sin(s.tw)
        const a = s.base * twinkle
        c.beginPath()
        c.fillStyle = `rgba(220, 230, 255, ${a})`
        c.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        c.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  }

  return () => {
    window.removeEventListener('resize', resize)
    cancelAnimationFrame(raf)
  }
}

export function SpaceBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    return attachStarfield(canvas)
  }, [])

  return (
    <div className="space-backdrop" aria-hidden>
      <canvas ref={canvasRef} className="space-backdrop__stars" />
    </div>
  )
}
