import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as fs from 'fs'
import { resolve } from 'path'

function inlineSvelte(templateFile: string, dest?: string) {
  return {
    name: 'Svelte Inliner',
    generateBundle(opts, bundles) {
      const template = fs.readFileSync(templateFile, 'utf-8')

      Object.keys(bundles).forEach((file) => {
        const ext = file.slice(file.lastIndexOf('.') + 1)
        if (ext === 'js') {
          const name = file.slice(0, file.lastIndexOf('.'))
          const code = template.replace(
            '%%script%%',
            () => bundles[file].code
          )
          fs.writeFileSync(`${opts.dir}/${name}.html`, code)
        }
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    watch: {
      ignored: ['!/node_modules/svelte-keyboard/**'],
      usePolling: true,
    },
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        front: resolve('src', 'front.ts'),
      },
      output: {
        format: 'iife',
        assetFileNames: '[name].[ext]',
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js',
      },
      plugins: [inlineSvelte(resolve('src', 'template.html'))],
    },
  },
  optimizeDeps: {
    exclude: ['svelte-keyboard'],
  },
})
