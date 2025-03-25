<p align="center">
  <a href="https://expo.dev/">
    <img alt="expo" height="128" src="assets/banner.png">
    <h1 align="center">Expo</h1>
  </a>
</p>

[![NPM](https://img.shields.io/npm/v/eas-cli-local-build-plugin/latest.svg)](https://npmjs.com/package/eas-cli-local-build-plugin)
[![License](https://img.shields.io/badge/license-BSL-green.svg?style=flat)](https://github.com/expo/turtle/blob/master/LICENSE)

[![Expo Developers Discord](https://img.shields.io/badge/Expo%20Developers-e01563.svg?logo=discord)](https://discord.gg/4gtbPAdpaE)
[![Expo Forums](https://img.shields.io/badge/Expo%20Forums-blue.svg)](https://forums.expo.dev/)

This repository contains a set of libraries used by EAS Build service to process builds.

name: Run tests
on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: ['18', '20', '22']
    name: Test with Node ${{ matrix.node }} on Linux
    steps:
      - uses: actions/checkout@v4
      - name: Setup node
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - name: Setup ncc
        run: npm install -g @vercel/ncc
      - run: yarn install --frozen-lockfile --check-files
      - run: yarn build
      - run: yarn test
      - run: yarn lint --max-warnings=0
