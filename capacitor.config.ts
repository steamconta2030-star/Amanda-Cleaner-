import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Tidly — Capacitor configuration for iOS / Android native shells.
 *
 * Usage (run locally on your machine, NOT inside Lovable):
 *   1. npm i -D @capacitor/cli
 *      npm i @capacitor/core @capacitor/ios @capacitor/android
 *   2. npx cap init "Tidly" "app.tidly.mobile" --web-dir=dist
 *   3. npm run build      (produces the SPA in dist/)
 *   4. npx cap add ios
 *      npx cap add android
 *   5. npx cap sync
 *   6. npx cap open ios       # opens Xcode
 *      npx cap open android   # opens Android Studio
 *
 * Store submission:
 *   • iOS  → Xcode → Archive → Upload to App Store Connect
 *   • Android → Android Studio → Build → Generate Signed Bundle (.aab)
 *              → upload on Google Play Console
 *
 * Alternative (Android + Windows only, zero code):
 *   Use https://pwabuilder.com — paste your published URL and download the
 *   store-ready packages. Uses this same manifest.webmanifest.
 */
const config: CapacitorConfig = {
  appId: "app.tidly.mobile",
  appName: "Tidly",
  webDir: "dist",
  backgroundColor: "#FAFAF7",
  ios: {
    contentInset: "always",
    limitsNavigationsToAppBoundDomains: false,
  },
  android: {
    allowMixedContent: false,
  },
  server: {
    // Point at the live PWA so app content updates instantly without a store release.
    // Set to `undefined` and comment this out to ship bundled offline assets instead.
    url: "https://amanda-cleaning.lovable.app",
    cleartext: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: "#FAFAF7",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
    },
  },
};

export default config;
