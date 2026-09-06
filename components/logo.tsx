import Image from 'next/image'

export function Logo() {
  return (
    <Image
      src="/grounds-logo-mark.jpg"
      alt="Grounds to Gather"
      width={56}
      height={56}
      priority
      className="h-12 w-12 object-contain md:h-14 md:w-14"
      sizes="(min-width: 768px) 56px, 48px"
    />
  )
}
