import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  isIntro?: boolean
  /** Card grid for the Projects section */
  projects?: boolean
}

export function ResumeSection({ children, isIntro, projects }: Props) {
  return (
    <section
      className={`resume-section${isIntro ? ' resume-section--intro' : ''}${projects ? ' resume-section--projects' : ''}`}
    >
      <div
        className={`resume-section__panel resume${projects ? ' resume--projects-cards' : ''}`}
      >
        {children}
      </div>
    </section>
  )
}
