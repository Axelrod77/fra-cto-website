'use client'

import { useEffect, useRef } from 'react'
import { SectionLabel } from '@/components/section-label'

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

function shuffled<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function TickerRow({ speed, reverse, fontSize }: { speed: number; reverse: boolean; fontSize: string }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Pause on hover
    const onEnter = () => { track.style.animationPlayState = 'paused' }
    const onLeave = () => { track.style.animationPlayState = 'running' }
    track.addEventListener('mouseenter', onEnter)
    track.addEventListener('mouseleave', onLeave)
    return () => {
      track.removeEventListener('mouseenter', onEnter)
      track.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const words = shuffled(VERBS)

  return (
    <div className="flex overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-4 shrink-0"
        style={{
          animation: `ticker ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {/* Two copies for seamless loop */}
        {[0, 1].map((copy) =>
          words.map((word, i) => (
            <span
              key={`${copy}-${i}`}
              className="shrink-0 font-mono font-medium rounded-md px-3 py-1.5 border transition-colors duration-300 cursor-default select-none"
              style={{
                fontSize,
                background: 'rgba(0, 151, 167, 0.06)',
                borderColor: 'rgba(0, 151, 167, 0.12)',
                color: 'var(--color-teal)',
              }}
            >
              {word}
            </span>
          ))
        )}
      </div>
    </div>
  )
}

export function WhatsRunningSection() {
  return (
    <div className="py-6 overflow-hidden border-t border-white/5">
      <SectionLabel text="// what's_running" className="mb-4 block px-6" />
      <div className="space-y-3">
        <TickerRow speed={180} reverse={false} fontSize="12px" />
        <TickerRow speed={200} reverse={true} fontSize="13px" />
        <TickerRow speed={160} reverse={false} fontSize="11px" />
      </div>
    </div>
  )
}
