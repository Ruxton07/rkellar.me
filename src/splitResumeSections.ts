/**
 * Split markdown at level-2 headings (`## ` at line start) so each block is its own viewport section.
 * CRLF is normalized so splits are reliable across editors/OS.
 */
export function splitResumeSections(markdown: string): string[] {
  const text = markdown.replace(/\r\n/g, '\n')
  const parts = text.split(/\n(?=## )/)
  return parts.map((p) => p.trim()).filter(Boolean)
}
