# RecipeFinder

React Native app for finding and saving recipes with offline support.

## Tech Stack

- **React Native** 0.82.1
- **TypeScript**
- **React Navigation** (Stack + Bottom Tabs)
- **Realm** (local storage)
- **Detox** (E2E testing)
- **DummyJSON API** (data source)

## Quick Start

### Install Dependencies

```sh
npm install
# or
yarn install
```

### iOS

```sh
cd ios && pod install && cd ..
npm run ios
```

### Android

```sh
npm run android
```

## Commands

```sh
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# E2E tests (iOS)
npm run build:e2e:ios
npm run test:e2e:ios

# E2E tests (Android)
npm run build:e2e:android
npm run test:e2e:android

# Linting
npm run lint
```

## E2E Tests

Tests cover:
- Pagination
- Search
