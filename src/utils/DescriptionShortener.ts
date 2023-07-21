export function DescriptionShortener(description: string): string {
  let text: string[] = description.split('').slice(0, 147)

  for (let i = -1; i < 3; i++) {
    text[text.length - 2 + i] = '.'
  }
  return text.join('')
}
