import * as fs from 'fs'
import * as path from 'path'

const createEslintConfigFile = (callback: (err?: Error) => void): void => {
  const config = {
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'standard'
    ],
    plugins: [
      'import',
      'node',
      'promise',
      'react',
      'react-hooks',
      '@typescript-eslint'
    ],
    env: {
      browser: true,
      node: true,
      es6: true
    },
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        tsx: true
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-console': 'off'
    }
  }

  const configFilePath = path.resolve('.eslintrc.json')

  fs.writeFile(configFilePath, JSON.stringify(config, null, 2), (err) => {
    if (err) {
      callback(err)
      return
    }
    callback()
  })
}

export default createEslintConfigFile
