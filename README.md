# QMS DISPLAY APP

![Build Status](https://github.com/trejosoftdo/qms-display-app/actions/workflows/node.js.yml/badge.svg)


QUEUE MANAGEMENT SERVICES Display Mobile application is an application to be used in services locations/branches to display the service turns status table.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Development](#development)
3. [Building and Deploying](#building-and-deploying)

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- An Expo account (if you plan to publish your app)

### Installation
1. Clone this repository to your local machine:
   ```
   git clone git@github.com:trejosoftdo/qms-display-app.git
   ```

2. Change to the project directory:
   ```
   cd qms-display-app/mobile-application
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Development

### Running the App
To start the Expo development server and run the app on your local machine, use the following command:

```
expo start
```

This will open the Expo DevTools in your web browser, allowing you to run the app on a simulator or physical device. You can also scan the QR code with the Expo Go app on your mobile device.

### Code Structure
- Source code is located in the `src` directory.
- App entry point is `index.tsx`.
- Components, and screens are organized within their respective directories in `src`.
- Routes are organized within the directory `app`.

### Testing
Run the next command to run the unit tests:
```
npm test
```

Run the next command to run the unit tests and covergae:
```
npm run test:coverage
```

### Linting
To run the linter, execute:
```
npm run lint
```

To fix the issues, run:
```
npm run lint:fix
```

### Types Check
To check the types, run:
```
npm run types:check
```

## Building and Deploying

### Building the App
To build the app for production, you can use the following command:

```
expo build:android
```

or

```
expo build:ios
```

Follow the Expo CLI prompts to configure the build, including signing credentials for iOS and Android.

### Publishing the App
To publish your app to the Expo client or the App Store/Google Play Store, use the following command:

```
expo publish
```

For store deployment, follow the [Expo documentation](https://docs.expo.dev/distribution/introduction/) for a more detailed process.
