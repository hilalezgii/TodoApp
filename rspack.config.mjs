import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';
import { ExpoModulesPlugin } from '@callstack/repack-plugin-expo-modules';
import { NativeWindPlugin } from '@callstack/repack-plugin-nativewind';
import rspack from '@rspack/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default Repack.defineRspackConfig(({ platform }) => ({
  context: __dirname,
  entry: './index.js',
  resolve: {
    ...Repack.getResolveOptions(),
    alias: {
      'expo-constants': path.resolve(__dirname, './shims/expo-constants.js'),
      '@expo/metro-runtime': path.resolve(__dirname, './shims/expo-metro-runtime.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.[cm]?[jt]sx?$/,
        type: 'javascript/auto',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-expo'],
            sourceType: 'unambiguous',
            caller: {
              platform,
              bundler: 'webpack',
            },
          },
        },
      },
      ...Repack.getAssetTransformRules(),
    ],
  },
  plugins: [
    new Repack.RepackPlugin(),
    new ExpoModulesPlugin(),
    new NativeWindPlugin({ cssInterop: true }),
    new rspack.DefinePlugin({
      'process.env.EXPO_ROUTER_APP_ROOT': JSON.stringify('./app'),
      'process.env.EXPO_ROUTER_IMPORT_MODE': JSON.stringify('sync'),
      'process.env.EXPO_OS': JSON.stringify(platform),
      'process.env.EXPO_BASE_URL': JSON.stringify(''),
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
}));
