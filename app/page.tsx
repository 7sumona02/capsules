'use client'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'

const Page = () => {
  const ref = useRef(null)
  const [isAbove, setIsAbove] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Green movement
  const yGreen = useTransform(scrollYProgress, [0, 0.5], ['100%', '0%'])
  const xGreen = useTransform(scrollYProgress, [0.6, 1], ['0%', '-100%'])

  // Blue movement
  const xBlue = useTransform(scrollYProgress, [0, 0.5], ['0%', '-100%'])
  const scaleBlue = useTransform(scrollYProgress, [0.6, 1], [1, 0.7])
  const opacityBlue = useTransform(scrollYProgress, [0.6, 1], [1, 0])

  // Red + Amber as before
  const scaleRed = useTransform(scrollYProgress, [0, 1], [1, 0.7])
  const opacityRed = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const yAmber = useTransform(scrollYProgress, [0.6, 1], ['100%', '0%'])

  // Change z-index dynamically
   useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // When scrolling down, switch above at mid-point
    // When scrolling up, revert earlier for smoother stacking
    if (latest > 0.50 && latest < 0.85) {
      setIsAbove(true)
    } else {
      setIsAbove(false)
    }
  })

  return (
    <div className="min-h-screen w-screen">
      <div className="h-screen w-screen bg-black text-neutral-100 flex justify-center items-center">
        animation start.
      </div>

      <div ref={ref} className="relative h-[200vh] bg-black">
        <div className="sticky top-0 h-screen w-screen flex justify-center items-center overflow-hidden">
          {/* Red */}
          <motion.div
            style={{ scale: scaleRed, opacity: opacityRed }}
            className="bg-red-800 text-4xl text-neutral-200 font-medium tracking-tight h-screen w-1/2 absolute left-0 rounded-[2.5rem] p-10"
          >
            <div>Enjoy the view through - the wide panoramic glass window</div>
          </motion.div>

          {/* Amber */}
          <motion.div
            style={{ y: yAmber }}
            className="bg-amber-800 h-screen w-1/2 absolute right-0 rounded-[2.5rem] overflow-hidden"
          >
            <img
              src="https://cdn.cosmos.so/2682cdc2-08f0-4998-aed8-53db9ae9c3d5.?format=jpeg"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Blue */}
          <motion.div
            style={{ x: xBlue, scale: scaleBlue, opacity: opacityBlue }}
            className="bg-blue-500 h-screen w-1/2 absolute right-0 rounded-[2.5rem] overflow-hidden z-40"
          >
            <img
              src="https://cdn.cosmos.so/2682cdc2-08f0-4998-aed8-53db9ae9c3d5.?format=jpeg"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Green — z-index toggles dynamically */}
          <motion.div
            style={{ y: yGreen, x: xGreen }}
            className={`bg-green-800 text-4xl text-neutral-200 font-medium tracking-tight h-screen w-1/2 absolute right-0 rounded-[2.5rem] p-10 transition-[z-index] duration-300 ${
              isAbove ? 'z-50' : 'z-30'
            }`}
          >
            <div>Enjoy the view through - the wide panoramic glass window</div>
          </motion.div>
        </div>
      </div>

      <div className="h-screen w-screen bg-black text-neutral-100 flex justify-center items-center">
        animation end.
      </div>
    </div>
  )
}

export default Page
