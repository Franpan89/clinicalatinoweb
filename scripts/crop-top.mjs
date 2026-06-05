// Recorta una porción del top de la imagen.
// Uso: node scripts/crop-top.mjs <input> <output> <fracción> (0.30 = corta el 30% superior)

import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const [, , inputArg, outputArg, fractionArg] = process.argv

if (!inputArg || !outputArg) {
  console.error('Uso: node scripts/crop-top.mjs <input.png> <output.png> [fraction=0.30]')
  process.exit(1)
}

const inputPath = path.resolve(inputArg)
const outputPath = path.resolve(outputArg)
const fraction = parseFloat(fractionArg ?? '0.30')

const buf = fs.readFileSync(inputPath)
const meta = await sharp(buf).metadata()
console.log(`📥 Input: ${meta.width}×${meta.height}`)

const cropTop = Math.round(meta.height * fraction)
const newHeight = meta.height - cropTop
console.log(`✂  Cropping top ${cropTop}px (${(fraction * 100).toFixed(0)}%) → ${meta.width}×${newHeight}`)

const cropped = await sharp(buf)
  .extract({ left: 0, top: cropTop, width: meta.width, height: newHeight })
  // re-trim por si quedan bordes transparentes
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 5 })
  .png()
  .toBuffer()

const finalMeta = await sharp(cropped).metadata()
fs.writeFileSync(outputPath, cropped)
console.log(`✅ Final: ${finalMeta.width}×${finalMeta.height} · ${(cropped.length / 1024).toFixed(1)} KB`)
