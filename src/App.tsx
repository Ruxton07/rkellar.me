import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import resume from './content/resume.md?raw'

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

export default function App() {
  return (
    <div className="page">
      <article className="resume">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {resume}
        </ReactMarkdown>
      </article>
    </div>
  )
}
