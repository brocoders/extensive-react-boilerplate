export function getBackgroundDots(fill = "gray", dotSize = 30, spacing = 20) {
  return `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 60"><text x="0" y="25" fill="${fill.replace("#", "%23")}" font-size="${dotSize}px">.</text></svg>') 0 0/${spacing}px ${spacing}px;`;
}
