import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import { fileURLToPath } from 'url';

import packageJson from './package.json' assert {type: 'json'};
global.__filename = fileURLToPath(import.meta.url);

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      PeerDepsExternalPlugin(),
      typescript({ 
        tsconfig: "./tsconfig.json",
        include: [
          "src/**/*"
        ],
        exclude: [
          "node_modules",
          "**/*.test.ts",
          "**/*.test.tsx",
          "**/*.stories.tsx",
        ],
      }),
      postcss({
        extract: true,
        modules: true,
        use: ["sass"],
      }),
      terser()
    ],
    external: ["react", "react-dom", "styled-components"]
  },
  {
    input: "./dist/esm/index.d.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "esm"
      }
    ],
    // external: [/\.s?css$/],
    plugins: [dts()],
  }
]