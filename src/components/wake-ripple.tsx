'use client'

import { useEffect, useRef } from 'react'

const VERBS = [
  'Accomplishing','Actioning','Actualizing','Architecting','Baking','Beaming','Beboppin\'',
  'Befuddling','Billowing','Blanching','Bloviating','Boogieing','Boondoggling','Booping',
  'Bootstrapping','Brewing','Bunning','Burrowing','Calculating','Canoodling','Caramelizing',
  'Cascading','Catapulting','Cerebrating','Channeling','Channelling','Choreographing',
  'Churning','Clauding','Coalescing','Cogitating','Combobulating','Composing','Computing',
  'Concocting','Considering','Contemplating','Cooking','Crafting','Creating','Crunching',
  'Crystallizing','Cultivating','Deciphering','Deliberating','Determining','Dilly-dallying',
  'Discombobulating','Doing','Doodling','Drizzling','Ebbing','Effecting','Elucidating',
  'Embellishing','Enchanting','Envisioning','Evaporating','Fermenting','Fiddle-faddling',
  'Finagling','Flambéing','Flibbertigibbeting','Flowing','Flummoxing','Fluttering',
  'Forging','Forming','Frolicking','Frosting','Gallivanting','Galloping','Garnishing',
  'Generating','Gesticulating','Germinating','Gitifying','Grooving','Gusting',
  'Harmonizing','Hashing','Hatching','Herding','Honking','Hullaballooing','Hyperspacing',
  'Ideating','Imagining','Improvising','Incubating','Inferring','Infusing','Ionizing',
  'Jitterbugging','Julienning','Kneading','Leavening','Levitating','Lollygagging',
  'Manifesting','Marinating','Meandering','Metamorphosing','Misting','Moonwalking',
  'Moseying','Mulling','Mustering','Musing','Nebulizing','Nesting','Newspapering',
  'Noodling','Nucleating','Orbiting','Orchestrating','Osmosing','Perambulating',
  'Percolating','Perusing','Philosophising','Photosynthesizing','Pollinating','Pondering',
  'Pontificating','Pouncing','Precipitating','Prestidigitating','Processing','Proofing',
  'Propagating','Puttering','Puzzling','Quantumizing','Razzle-dazzling','Razzmatazzing',
  'Recombobulating','Reticulateing','Roosting','Ruminating','Sautéing','Scampering',
  'Schlepping','Scurrying','Seasoning','Shenaniganing','Shimmying','Simmering',
  'Skedaddling','Sketching','Slithering','Smooshing','Sock-hopping','Spelunking',
  'Spinning','Sprouting','Stewing','Sublimating','Swirling','Swooping','Symbioting',
  'Synthesizing','Tempering','Thinking','Thundering','Tinkering','Tomfoolering',
  'Topsy-turvying','Transfiguring','Transmuting','Twisting','Undulating','Unfurling',
  'Unravelling','Vibing','Waddling','Wandering','Warping','Whatchamacalliting',
  'Whirlpooling','Whirring','Whisking','Wibbling','Working','Wrangling','Zesting','Zigzagging'
]

interface Particle {
  text: string
  x: number
  y: number
  fontSize: number
  alpha: number
  maxAlpha: number
  life: number
  decay: number
  vx: number
  vy: number
  rotation: number
}

export function WakeRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Particle[] = []
    const MAX_PARTICLES = 50
    let mouseX = -1000
    let mouseY = -1000
    let lastMouseX = -1000
    let lastMouseY = -1000
    let lastSpawnTime = 0
    let animFrame: number

    function resize() {
      const dpr = window.devicePixelRatio
      canvas!.width = window.innerWidth * dpr
      canvas!.height = window.innerHeight * dpr
      canvas!.style.width = window.innerWidth + 'px'
      canvas!.style.height = window.innerHeight + 'px'
    }
    resize()

    const onResize = () => resize()
    const onMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    const onMouseLeave = () => { mouseX = -1000; mouseY = -1000 }

    window.addEventListener('resize', onResize)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    function spawnWord(x: number, y: number) {
      if (particles.length >= MAX_PARTICLES) return
      const word = VERBS[Math.floor(Math.random() * VERBS.length)]
      const angle = Math.random() * Math.PI * 2
      const distance = 30 + Math.random() * 60
      const fontSize = 9 + Math.random() * 5

      particles.push({
        text: word,
        x: x + Math.cos(angle) * 20,
        y: y + Math.sin(angle) * 20,
        fontSize,
        alpha: 0,
        maxAlpha: 0.12 + Math.random() * 0.2,
        life: 1.0,
        decay: 0.006 + Math.random() * 0.01,
        vx: Math.cos(angle) * 0.4,
        vy: Math.sin(angle) * 0.4 - 0.25,
        rotation: (Math.random() - 0.5) * 0.3,
      })
    }

    function update() {
      const dpr = window.devicePixelRatio
      ctx!.setTransform(1, 0, 0, 1, 0, 0)
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.scale(dpr, dpr)

      const now = performance.now()
      const dx = mouseX - lastMouseX
      const dy = mouseY - lastMouseY
      const speed = Math.sqrt(dx * dx + dy * dy)

      if (speed > 3 && now - lastSpawnTime > 100) {
        const count = Math.min(2, Math.floor(speed / 25) + 1)
        for (let i = 0; i < count; i++) {
          spawnWord(mouseX, mouseY)
        }
        lastSpawnTime = now
      }

      lastMouseX = mouseX
      lastMouseY = mouseY

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        if (p.life > 0.8) {
          p.alpha = Math.min(p.maxAlpha, p.alpha + 0.03)
        } else {
          p.alpha = p.maxAlpha * (p.life / 0.8)
        }

        p.life -= p.decay
        p.x += p.vx
        p.y += p.vy
        p.vy -= 0.008

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx!.save()
        ctx!.translate(p.x, p.y)
        ctx!.rotate(p.rotation)
        ctx!.font = `${p.fontSize}px var(--font-mono), 'JetBrains Mono', monospace`
        ctx!.fillStyle = `rgba(0, 151, 167, ${p.alpha})`
        ctx!.fillText(p.text, 0, 0)
        ctx!.restore()
      }

      animFrame = requestAnimationFrame(update)
    }

    // Respect reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!motionQuery.matches) {
      update()
    }

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  )
}
