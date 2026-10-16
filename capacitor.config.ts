import type { CapacitorConfig } from "@capacitor/cli";

// eklo-mobile is deliberately a thin native shell, not a second copy of the
// app: server.url points the WebView straight at the live production site
// (the same eklo-application/eklo-se code everyone already uses in a
// browser), so there is exactly one place the real UI/logic lives. webDir
// still needs to exist (Capacitor's native templates expect it even in
// remote-url mode) -- it holds a minimal offline fallback page only, never
// the real app.
const config: CapacitorConfig = {
  appId: "se.ekloapp.app",
  appName: "eklo",
  webDir: "www",
  server: {
    url: "https://ekloapp.se",
    cleartext: false,
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
};

export default config;
