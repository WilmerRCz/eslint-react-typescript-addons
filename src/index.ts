#!/usr/bin/env node

/// <reference types="node" />

import { spawn } from 'child_process';
import createEslintConfigFile from './utils/createEslintConfigFile';

const packagesToInstall: string[] = [
  'eslint',
  'eslint-config-standard',
  'eslint-plugin-import',
  'eslint-plugin-node',
  'eslint-plugin-promise',
  'eslint-plugin-react',
  'eslint-plugin-react-hooks',
  'eslint-plugin-react-refresh',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
];
const installCommand = process.argv[1].includes('yarn') ? 'yarn add -D' : 'npm install -D';
const installPackagesCommand = `${installCommand} ${packagesToInstall.join(' ')}`;


const installPackagesProcess = spawn(installPackagesCommand, {
  shell: true,
});
console.log('📦Installing ESLint packages...');
installPackagesProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

installPackagesProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

installPackagesProcess.stderr.on('data', (data) => {
  console.error(`❌Error installing packages: ${data.toString()}`);
});

installPackagesProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ESLint packages installed successfully.');
    createEslintConfigFile((err) => {
      if (err) {
        console.error(`❌Error creating Eslint configuration file: ${err}`);
        return;
      }
      console.log('✅.eslintrc.json created successfully.');
    });
  } else {
    console.error(`❌Error installing packages: npm command exited with code ${code}`);
  }
});
