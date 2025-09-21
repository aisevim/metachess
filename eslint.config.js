import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: {
    tsconfigPath: resolve(dirname(fileURLToPath(import.meta.url)), './tsconfig.json'),
  },
})
