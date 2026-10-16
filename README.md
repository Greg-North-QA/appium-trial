# Appium React Native Practice App

A small three-screen React Native application for learning Android automation with Appium and WebdriverIO.

## What is included

- **Home:** launch the registration journey.
- **Registration:** practise text entry, secure fields, radio-style options, switches, scrolling, validation, reset and submit actions.
- **Result:** assert submitted values and success or failure states, then navigate home or restart.
- Expo Router stack navigation with a native header on all three screens.
- Stable `testID` and `accessibilityLabel` values for Appium accessibility-ID selectors.
- A 1.2-second stubbed submission delay for explicit-wait practice.
- An unsuccessful stub response when the submitted email contains `fail`.

## Prerequisites

- Node.js and npm
- Android Studio with an Android emulator configured and running
- Java/JDK required by the Android build tools
- Appium 2 or newer with the UiAutomator2 driver

If Appium and its Android driver are not already installed:

    npm install --global appium
    appium driver install uiautomator2

## Build and install the native Android app

From the repository root:

    npm install
    npm --prefix mobile-app install
    npm run app:install

The first native build creates the generated Android project, builds it and installs package `com.gregnorth.appiumpractice` on the running emulator. Keep the emulator running.

For UI development without Appium, Expo Go can instead be launched with:

    npm run app:android

Expo Go uses a different Android package, so use the native build for the supplied Appium test.

## Run the Appium test

Start the Appium server in one terminal:

    appium

Run the existing WebdriverIO journey from another terminal:

    npm test

The test launches the installed app, completes a successful registration and checks the result. Appium defaults to `localhost:4723`; override this with `APPIUM_HOST` and `APPIUM_PORT` environment variables if required.

## Useful accessibility IDs

| Screen       | Accessibility IDs                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Home         | `home-screen`, `home-title`, `start-registration`                                                                              |
| Registration | `full-name-input`, `email-input`, `password-input`, `experience-advanced`, `terms-switch`, `submit-registration`, `reset-form` |
| Validation   | `name-error`, `email-error`, `password-error`, `terms-error`                                                                   |
| Result       | `result-heading`, `result-email`, `result-experience`, `result-reference`, `return-home`, `register-again`                     |

In WebdriverIO, accessibility IDs use the `~` selector, for example `$('~start-registration')`.

## Suggested exercises

1. Submit an empty form and assert all validation messages.
2. Test each experience option and verify the selected state.
3. Submit an email containing `fail` and assert the failure result.
4. Reset a populated form and verify every field's value.
5. Add reusable page objects for the three screens.
6. Split the successful and unsuccessful journeys into a WebdriverIO test suite.
7. Capture a screenshot automatically when an assertion fails.
