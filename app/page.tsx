'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const Page = () => {
  const ref = useRef(null)

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Red fade and scale
  const scaleRed = useTransform(scrollYProgress, [0, 1], [1, 0.7])
  const opacityRed = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Green slides up
  const yGreen = useTransform(scrollYProgress, [0, 0.5], ['100%', '0%'])
  // Blue slides left
  const xBlue = useTransform(scrollYProgress, [0, 0.5], ['0%', '-100%'])

  return (
    <div className="min-h-screen w-screen">
      {/* Section before */}
      <div className="h-screen w-screen bg-black text-neutral-100 flex justify-center items-center">
        animation start.
      </div>

      {/* Scrollable wrapper — taller than viewport to create scroll progress */}
      <div ref={ref} className="relative h-[200vh] bg-black">
        {/* Sticky container — stays pinned while scrollYProgress animates */}
        <div className="sticky top-0 h-screen w-screen flex justify-center items-center overflow-hidden">
          {/* Red layer */}
          <motion.div
            style={{ scale: scaleRed, opacity: opacityRed }}
            className="bg-red-800 text-4xl text-neutral-200 font-medium tracking-tight h-screen w-1/2 absolute left-0 rounded-[2.5rem] p-10"
          >
            <div>Enjoy the view through - the wide panoramic glass window</div>
          </motion.div>

          {/* Green layer */}
          <motion.div
            style={{ y: yGreen }}
            className="bg-green-800 text-4xl text-neutral-200 font-medium tracking-tight h-screen w-1/2 absolute right-0 rounded-[2.5rem] p-10"
          >
             <div>Enjoy the view through - the wide panoramic glass window</div>
          </motion.div>

          {/* Blue layer */}
          <motion.div
            style={{ x: xBlue }}
            className="bg-blue-500 h-screen w-1/2 absolute right-0 z-50 rounded-[2.5rem] overflow-hidden"
          >
            <img
              src="https://cdn.cosmos.so/2682cdc2-08f0-4998-aed8-53db9ae9c3d5.?format=jpeg"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Section after */}
      <div className="h-screen w-screen bg-black text-neutral-100 flex justify-center items-center">
        animation end.
      </div>
    </div>
  )
}

export default Page
