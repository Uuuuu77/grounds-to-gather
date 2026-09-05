'use client'
import { Coffee } from 'lucide-react'
import { Kaushan_Script } from 'next/font/google'

const kaushan = Kaushan_Script({ subsets: ['latin'], weight: '400' })

export function Logo() {
  return (
    <div className="flex items-center gap-2 h-[40px] md:h-[48px] lg:h-[56px]">
      <Coffee size={28} className="text-foreground md:size-6 lg:size-7" />
      <span
        className={`${kaushan.className} text-foreground text-xl md:text-2xl lg:text-3xl leading-none`}
      >
        Grounds to Gather
      </span>
    </div>
  )
}
