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
  // const yGreen = useTransform(scrollYProgress, [0, 0.5], ['100%', '0%'])

  const yGreen = useTransform(scrollYProgress, [0, 0.5], ['100%', '0%'])
  const xGreen = useTransform(scrollYProgress, [0.6, 1], ['0%', '-100%'])
  const zGreen = useTransform(scrollYProgress, [0.6, 1], [0, 200])
  // Blue slides left
  const xBlue = useTransform(scrollYProgress, [0, 0.5], ['0%', '-100%'])
  const zBlue = useTransform(scrollYProgress, [0.6,1], [50,0])
  const scaleBlue = useTransform(scrollYProgress, [0.6,1], [1,0.7])
  const opacityBlue = useTransform(scrollYProgress, [0.6,1], [1, 0])

  const yAmber = useTransform(scrollYProgress, [0.6, 1], ['100%', '0%'])

  const text1Opacity = useTransform(scrollYProgress, [0.5,0.7], [1,0])
  const text2Opacity = useTransform(scrollYProgress, [0.7,0.9], [0,1])

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
            style={{ y: yGreen, x: xGreen, z: zGreen }}
            className="bg-green-800 text-4xl text-neutral-200 font-medium z-50 tracking-tight h-screen w-1/2 absolute right-0 rounded-[2.5rem] p-10"
          >
            <motion.div style={{opacity: text1Opacity}} className='absolute top-10 left-10 w-lg'>Enjoy the view through - the wide panoramic glass window</motion.div>
            <motion.div style={{opacity: text2Opacity}}  className='absolute top-10 left-10 w-lg'>Yo, I came!!!</motion.div>
          </motion.div>

          <motion.div
            style={{ y: yAmber }}
            className="bg-amber-800 text-4xl text-neutral-200 font-medium z-0 tracking-tight h-screen w-1/2 absolute right-0 rounded-[2.5rem] overflow-hidden"
          >
             <img
              src="https://cdn.cosmos.so/2682cdc2-08f0-4998-aed8-53db9ae9c3d5.?format=jpeg"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Blue layer */}
          <motion.div
            style={{ x: xBlue, scale: scaleBlue, opacity: opacityBlue, z: zBlue }}
            className="bg-blue-500 h-screen w-1/2 absolute right-0 rounded-[2.5rem] overflow-hidden"
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
