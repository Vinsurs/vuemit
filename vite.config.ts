import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'vuemit',
            formats: ['es', 'cjs', 'umd'],
            fileName(format) {
                return `index.${format}.js`
            },
        }
    }
})