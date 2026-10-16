# eklo-mobile

A thin native shell around the live production site (`https://ekloapp.se`),
built with [Capacitor](https://capacitorjs.com/). This is **not** a second
copy of the app -- `capacitor.config.ts`'s `server.url` points the WebView
straight at production, so eklo-application stays the one place the real
UI/logic/backend lives. The `android/` and `ios/` folders here are just the
native wrapper (app icon, splash screen, push notifications, status bar)
that lets that same site be listed on the Play Store and App Store.

`appId` is currently `se.ekloapp.app` (reverse-DNS of `ekloapp.se`) --
easy to change now, much harder once either store listing exists, so worth
confirming before the first submission.

## Status

- [x] Capacitor core + config, pointing at production
- [x] Android native project scaffolded (`android/`)
- [x] iOS native project scaffolded (`ios/`)
- [ ] Real app icon + splash screen (currently using eklo-se's small
      favicon-sized PNGs as placeholders -- need a 1024x1024 source icon
      and a splash image; `@capacitor/assets` can generate every
      size/density from those two once they exist)
- [ ] Android signing keystore + a debug build actually run on a device/
      emulator
- [ ] iOS build (needs a Mac -- see below)
- [ ] Apple Developer Program enrollment ($99/yr)
- [ ] Google Play Console account ($25 one-time)
- [ ] Store listings: screenshots, description, privacy policy URL,
      support URL, content rating questionnaire
- [ ] Push notification backend wiring (APNs/FCM credentials), if wanted
      for v1 -- the plugin is installed but unconfigured

## The Mac problem

Building, signing, and archiving the iOS app requires Xcode, which only
runs on macOS. This machine is Windows, so iOS can't be built or tested
locally. Options, roughly cheapest/simplest first:

1. **Cloud CI with Mac runners** -- e.g. Codemagic (has a free tier aimed
   at exactly this: Capacitor/Ionic apps, handles iOS code signing without
   ever needing your own Mac) or GitHub Actions' `macos-latest` runner.
2. **Rent a Mac in the cloud** -- e.g. MacStadium, MacinCloud -- full
   remote Xcode access.
3. **Borrow/buy a Mac** -- most control, but a real cost if you don't
   already have access to one.

Android has no such restriction -- `android/` can be opened in Android
Studio (or built from the command line with Gradle) on this machine once
Android Studio / the Android SDK is installed.

## Commands

```
npm run sync          # re-copy config/plugins into android/ and ios/ after a config change
npm run open:android  # open the Android project in Android Studio
npm run open:ios      # open the iOS project in Xcode (macOS only)
```

## Why a separate project

Kept entirely separate from the `eklo-application` repo (same reasoning as
`eklo-launch`): it has its own build/release lifecycle (app store review
cycles, native signing, separate version numbers from the web app) that
has nothing to do with `sandbox`/`main` there, and nothing here ever
touches the live web app's code or database.
