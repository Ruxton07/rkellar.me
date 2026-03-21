import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import resume from './content/resume.md?raw'
import { splitResumeSections } from './splitResumeSections'
import { ResumeSection } from './ResumeSection'

const markdownComponents: Components = {
  a: ({ href, children, ...rest }) => {
    const external = href?.startsWith('http')
    return (
      <a
        href={href}
        {...rest}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  },
}

const sections = splitResumeSections(resume)

export default function App() {
  return (
    <div className="page">
      {sections.map((chunk, i) => {
        const isProjects = chunk.trimStart().startsWith('## Projects')
        return (
          <ResumeSection key={i} isIntro={i === 0} projects={isProjects}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {chunk}
            </ReactMarkdown>
          </ResumeSection>
        )
      })}
    </div>
  )
}
