import { useEffect, useRef, useState } from 'react'
export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){setIsVisible(true);obs.disconnect()} },{threshold})
    if(ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  },[threshold])
  return { ref, isVisible }
}