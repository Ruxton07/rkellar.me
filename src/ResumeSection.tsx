import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  isIntro?: boolean
}

export function ResumeSection({ children, isIntro }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(isIntro ?? false)

  useEffect(() => {
    if (isIntro) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15, rootMargin: '-5% 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [isIntro])

  return (
    <section
      ref={ref}
      className={`resume-section${visible ? ' resume-section--visible' : ''}${isIntro ? ' resume-section--intro' : ''}`}
    >
      <div className="resume-section__panel resume">{children}</div>
    </section>
  )
}
