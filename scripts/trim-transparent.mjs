// Recorta el espacio transparente alrededor de un PNG, dejando solo el sujeto.
// Uso: node scripts/trim-transparent.mjs <input> <output>

import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const [, , inputArg, outputArg] = process.argv

if (!inputArg || !outputArg) {
  console.error('Uso: node scripts/trim-transparent.mjs <input.png> <output.png>')
  process.exit(1)
}

const inputPath = path.resolve(inputArg)
const outputPath = path.resolve(outputArg)

const inputBuf = fs.readFileSync(inputPath)
const inputMeta = await sharp(inputBuf).metadata()
console.log(`📥 Input: ${inputMeta.width}×${inputMeta.height} (${(inputBuf.length / 1024).toFixed(1)} KB)`)

// `trim` con un threshold pequeño remueve los píxeles transparentes
// Le pasamos `background: { alpha: 0 }` para que recorte basado en transparencia
const trimmed = sharp(inputBuf).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 5 })
const outputMeta = await trimmed.metadata()
const outputBuf = await trimmed.png().toBuffer()
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, outputBuf)

const finalMeta = await sharp(outputBuf).metadata()
console.log(`✂  Cropped to: ${finalMeta.width}×${finalMeta.height}`)
console.log(`✅ Saved: ${outputPath} (${(outputBuf.length / 1024).toFixed(1)} KB)`)
