import { memo } from 'react'
import { replaceLinksWithTags } from 'utils/index'

export const MarkdownText = memo(({ text }: { text: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: replaceLinksWithTags(text) }} />
})

MarkdownText.displayName = 'MarkdownText'
