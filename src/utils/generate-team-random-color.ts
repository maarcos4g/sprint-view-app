export function generateTeamRandomColor(): string {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  console.log(`rgb(${r}, ${g}), ${b})`)

  return `rgb(${r}, ${g}, ${b})`
}