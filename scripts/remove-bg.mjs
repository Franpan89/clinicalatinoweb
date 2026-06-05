// Remueve el fondo de una imagen y la guarda como PNG con transparencia.
// Uso: node scripts/remove-bg.mjs <input> <output>

import { removeBackground } from '@imgly/background-removal-node'
import fs from 'fs'
import path from 'path'

const [, , inputArg, outputArg] = process.argv

if (!inputArg || !outputArg) {
  console.error('Uso: node scripts/remove-bg.mjs <input.jpg> <output.png>')
  process.exit(1)
}

const inputPath = path.resolve(inputArg)
const outputPath = path.resolve(outputArg)

if (!fs.existsSync(inputPath)) {
  console.error(`No existe: ${inputPath}`)
  process.exit(1)
}

const startTotal = Date.now()
console.log(`📥 Leyendo: ${inputPath}`)
const inputBuffer = fs.readFileSync(inputPath)
console.log(`   ${(inputBuffer.length / 1024).toFixed(1)} KB`)

// Detecta MIME por extensión
const ext = path.extname(inputPath).toLowerCase()
const mimeType =
  ext === '.png'
    ? 'image/png'
    : ext === '.webp'
      ? 'image/webp'
      : 'image/jpeg'

// La lib necesita Blob con type explícito
const inputBlob = new Blob([inputBuffer], { type: mimeType })

console.log(`🧠 Procesando con AI (puede tardar 30-90s la primera vez)...`)
const blob = await removeBackground(inputBlob, {
  output: { format: 'image/png', quality: 0.9 },
  progress: (key, current, total) => {
    if (key.startsWith('fetch')) {
      process.stdout.write(`\r   ${key}: ${Math.round((current / total) * 100)}%   `)
    }
  },
})
console.log()

const arrayBuffer = await blob.arrayBuffer()
const outputBuffer = Buffer.from(arrayBuffer)

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, outputBuffer)

const elapsed = ((Date.now() - startTotal) / 1000).toFixed(1)
console.log(`✅ Guardado: ${outputPath}`)
console.log(`   ${(outputBuffer.length / 1024).toFixed(1)} KB · ${elapsed}s`)
