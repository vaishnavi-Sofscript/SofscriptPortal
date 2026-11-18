/**
 * Builds the portal into ONE self-contained HTML file: export/sofscript-portal.html
 *
 *   pnpm build:single
 *
 * The result has no sibling files and no CDN dependencies — the JavaScript, the
 * CSS, the logo and the favicon are all inlined — so it can be copied to a web
 * server, opened from a USB stick or emailed as a single attachment.
 *
 * It is generated output. Never hand-edit the HTML it produces; change the code
 * in src/ and run this again.
 *
 * Two things it deliberately does differently from `pnpm build`:
 *   - production mode, so React's development build (and its ~370 kB of warning
 *     text) is not shipped;
 *   - every asset inlined, so nothing resolves to a neighbouring file.
 *
 * Note: the phone directory and the demo videos are still loaded at runtime from
 * the hospital portal. Those cannot be inlined — they are live data.
 */
import { build } from 'vite'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const staging = path.join(root, 'node_modules', '.single-file-build')
const outFile = path.join(root, 'export', 'sofscript-portal.html')

/** Inline a file as a `data:` URI. */
async function dataUri(file, type) {
  const bytes = await fs.readFile(file)
  return `data:${type};base64,${bytes.toString('base64')}`
}

/** Escape a replacement string so `$&`, `$1` etc. are treated literally. */
const literal = (s) => s.replace(/\$/g, '$$$$')

console.log('Building production bundle…')
await build({
  configFile: path.join(root, 'vite.config.ts'),
  mode: 'production',
  logLevel: 'warn',
  build: {
    outDir: staging,
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    cssCodeSplit: false,
    // Inline every asset the JS and CSS reference, however large.
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
  },
})

// The app has no dynamic imports, so the build is one chunk. If that ever
// changes, the extra chunks would be fetched at runtime and the "single" file
// would quietly stop working — so check rather than assume.
const chunks = (await fs.readdir(path.join(staging, 'assets')))
  .filter((f) => f.endsWith('.js'))
if (chunks.length !== 1) {
  throw new Error(
    `Expected one JS chunk, got ${chunks.length}: ${chunks.join(', ')}.\n` +
      'A dynamic import() was added — it must be made static to stay single-file.',
  )
}

let html = await fs.readFile(path.join(staging, 'index.html'), 'utf8')

// 1. Replace the <script src> with the bundle itself.
const scriptTag = /<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/
const scriptMatch = html.match(scriptTag)
if (!scriptMatch) throw new Error('No <script src> found in the built index.html')
const js = await fs.readFile(path.join(staging, scriptMatch[1]), 'utf8')
html = html.replace(
  scriptTag,
  `<script type="module">\n${literal(js.trimEnd())}\n</script>`,
)

// 2. Replace the stylesheet <link> with the CSS itself. The font @import must
//    stay the first thing in the <style> block, which it already is.
const linkTag = /<link\b[^>]*\brel="stylesheet"[^>]*\bhref="([^"]+)"[^>]*>/
const linkMatch = html.match(linkTag)
if (linkMatch) {
  const css = await fs.readFile(path.join(staging, linkMatch[1]), 'utf8')
  html = html.replace(linkTag, `<style>\n${literal(css.trimEnd())}\n</style>`)
}

// 3. Inline the favicon so the tab icon works without a neighbouring file.
const iconTag = /(<link\b[^>]*\brel="icon"[^>]*\bhref=")([^"]+)(")/
const iconMatch = html.match(iconTag)
if (iconMatch && !iconMatch[2].startsWith('data:')) {
  const icon = path.join(staging, iconMatch[2])
  html = html.replace(
    iconTag,
    `$1${literal(await dataUri(icon, 'image/svg+xml'))}$3`,
  )
}

// 4. Fail loudly rather than shipping a file that silently needs siblings.
//    Only the markup is scanned: the inlined JS and CSS contain `src="`/`href="`
//    fragments of their own that are not references to real files.
const markup = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '<script></script>')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '<style></style>')
const external = [...markup.matchAll(/\b(?:src|href)="(?!data:|https?:|#)([^"]+)"/g)]
if (external.length) {
  throw new Error(
    `Not self-contained — these still point at separate files:\n  ` +
      external.map((m) => m[1]).join('\n  '),
  )
}
if (/react\.dev\/link\/invalid-hook-call/.test(html)) {
  throw new Error("React's development build was bundled; expected production.")
}

await fs.mkdir(path.dirname(outFile), { recursive: true })
await fs.writeFile(outFile, html, 'utf8')
await fs.rm(staging, { recursive: true, force: true })

console.log(
  `\nWrote ${path.relative(root, outFile)} — ${(html.length / 1024).toFixed(1)} kB, self-contained.`,
)
