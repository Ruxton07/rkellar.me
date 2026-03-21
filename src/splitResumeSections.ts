/** Split markdown at level-2 headings so each major resume block can be its own viewport section. */
export function splitResumeSections(markdown: string): string[] {
  const parts = markdown.split(/\n(?=## )/)
  return parts.map((p) => p.trim()).filter(Boolean)
}
