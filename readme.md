# Hon-Murasaki (Expo App)

[WIP]

This project is a mobile and web application built with Expo, React Native, TypeScript, and NativeWind (for Tailwind CSS). It aims to provide a [**Please add a brief description of your app's purpose here, e.g., "a tool for X", "a platform for Y"**].

## ✨ Features

*   **Cross-Platform:** Built with Expo for iOS, Android, and Web.
*   **Modern Stack:** Utilizes React Native, TypeScript for type safety.
*   **Styling:** Styled with Tailwind CSS via NativeWind.
*   **E2E Testing:** End-to-end tests for the web platform using Playwright.

## 🚀 Getting Started

### Prerequisites

**Necessary:**

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   `npm` (comes with Node.js)
*   For iOS development (macOS): Xcode
*   For Android development: Android Studio & Android SDK

**Recommended:**

*   [Expo CLI](https://docs.expo.dev/get-started/installation/): While not strictly required for project operation (you can use `npx expo <command>` or npm scripts), having it globally installed (`npm install -g expo-cli`) can be convenient for some Expo-related tasks.
*   (macOS) [Watchman](https://facebook.github.io/watchman/docs/install/): `brew install watchman` (Can improve build performance by watching for file changes).


### Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd HOnmurasaki
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers** (for running E2E tests):
    ```bash
    npx playwright install
    ```

## 📜 Available Scripts

In the project directory, you can run the following commands:

*   **`npm start`** or **`expo start`**
    *   Starts the Metro bundler and development server. You can then choose to open the app on a simulator/emulator or a physical device using the Expo Go app, or in a web browser.

*   **`npm run android`** or **`expo start --android`**
    *   Starts the app on a connected Android device or emulator.

*   **`npm run ios`** or **`expo start --ios`**
    *   Starts the app on an iOS simulator (macOS only) or a connected iOS device.

*   **`npm run web`** or **`expo start --web --port 3000`**
    *   Starts the app in your web browser on `http://localhost:3000`.

*   **`npm run lint`**
    *   Lints the codebase using ESLint and checks formatting with Prettier.

*   **`npm run format`**
    *   Formats the codebase using ESLint (with `--fix`) and Prettier.

*   **`npm test`**
    *   Runs the Playwright end-to-end tests. (See "🧪 Running Tests" section for more details).

*   **`npm run prebuild`** or **`expo prebuild`**
    *   Generates the native `android` and `ios` project files if you need to work with native code or build standalone binaries.

## 🧪 Running Tests

This project uses [Playwright](https://playwright.dev/) for end-to-end testing, primarily focused on the web version.

1.  **Ensure browsers are installed:**
    If you haven't already, install the necessary browser binaries for Playwright:
    ```bash
    npx playwright install
    ```

2.  **Run the tests:**
    ```bash
    npm test
    ```
    Test results and reports will be generated in the `test-results/` and `playwright-report/` directories (as configured in `playwright.config.ts`).

## 📁 Project Structure

A brief overview of the key directories:

*   **`assets/`**: Contains static assets like images, icons, and fonts.
*   **`components/`**: Reusable UI components used throughout the application.
*   **`tests/`**:
    *   `e2e/`: End-to-end tests written with Playwright.
        *   `web/`: E2E tests specifically for the web platform.
*   **`types/`**: Custom TypeScript type definitions.
*   **`App.tsx`**: The main entry point of the application.
*   **`app.json`**: Expo configuration file.
*   **`tailwind.config.js`**: Configuration for Tailwind CSS (via NativeWind).
*   **`tsconfig.json`**: TypeScript compiler options.

## 🛠️ Built With

*   [Expo](https://expo.dev/) - Framework for building universal React applications.
*   [React Native](https://reactnative.dev/) - Library for building native apps using React.
*   [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript that adds static typing.
*   [NativeWind](https://www.nativewind.dev/) - Tailwind CSS for React Native.
*   [Playwright](https://playwright.dev/) - Framework for end-to-end testing.

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
(Consider adding a `CONTRIBUTING.md` file with more detailed guidelines).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
