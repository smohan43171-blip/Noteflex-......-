# NoteFlex 📓

A production-ready, local-first note app built with **React Native + Expo SDK 51**.
All 4 note types, 3 skins, 2 scroll modes. Firebase-ready stubs for v2.

---

## File Tree

```
NoteFlex/
├── App.js                          ← root, bootstraps DB + navigation
├── app.json                        ← Expo config (permissions, icons)
├── package.json
├── babel.config.js
└── src/
    ├── utils/
    │   ├── types.ts                ← Note type definitions
    │   └── constants.js            ← Colors, sizes, labels
    ├── services/
    │   ├── db.js                   ← SQLite CRUD (notes table)
    │   ├── storage.js              ← expo-file-system: save images/audio/draw
    │   ├── sync.js                 ← Firebase stubs (FIREBASE-TODO)
    │   ├── export.js               ← Export stubs (TODO: PDF, MD, TXT)
    │   └── customization.js        ← Custom skin stubs
    ├── hooks/
    │   ├── useNotes.js             ← CRUD hook backed by SQLite
    │   └── useSync.js              ← Firebase sync hook stub
    ├── skins/
    │   ├── BlankSkin.js            ← White background
    │   ├── LinesHorizontal.js      ← Notebook horizontal rules (SVG)
    │   └── LinesVertical.js        ← Vertical rules (SVG)
    ├── components/
    │   ├── NoteCard.js             ← Grid/list card with icon + time
    │   ├── FAB.js                  ← Floating action button with 4 options
    │   ├── SkinRenderer.js         ← switch(skin) → add new skins here
    │   └── BookPager.js            ← Horizontal paginated scroll with arrows
    └── screens/
        ├── HomeScreen.js           ← Note grid, search, FAB
        ├── NoteEditor.js           ← All 4 note types unified editor
        └── SettingsScreen.js       ← Prefs + Firebase toggle placeholder
```

---

## Setup

### 1. Install Expo CLI

```bash
npm install -g expo-cli
```

### 2. Create the project

```bash
npx create-expo-app NoteFlex
cd NoteFlex
```

### 3. Replace generated files with NoteFlex source

Copy all files from this repo into your `NoteFlex/` folder.

### 4. Install dependencies

```bash
npm install \
  expo-sqlite \
  expo-file-system \
  expo-av \
  expo-image-picker \
  react-native-sketch-canvas \
  react-native-svg \
  react-native-gesture-handler \
  react-native-reanimated \
  react-native-screens \
  react-native-safe-area-context \
  @react-navigation/native \
  @react-navigation/native-stack \
  @react-native-async-storage/async-storage \
  uuid
```

### 5. Run

```bash
npx expo start
```

Then scan the QR code with **Expo Go** on your phone (Android or iOS).

---

## Testing Each Feature

| Feature | How to test |
|---|---|
| **Text Note** | Tap +  → 📝 Text Note → type freely |
| **Image Note** | Tap + → 🖼️ Image Note → Gallery or Camera |
| **Audio Note** | Tap + → 🎙️ Audio Note → Record → Stop → Play |
| **Draw Note** | Tap + → ✏️ Draw Note → draw on canvas → Save |
| **Skins** | Open any note → ⚙️ top right → tap Skin to cycle |
| **Book Mode** | Open text note → ⚙️ → tap Scroll to switch to Book Pages |
| **Search** | Home screen search bar → type note title or content |
| **Delete** | Long-press any card → confirm Delete |
| **Grid/List** | Tap ☰/⊞ toggle top right on Home |

---

## Adding New Skins (zero refactor)

1. Create `src/skins/MySkin.js` — export a component with `{ children, style }` props
2. Add a case in `src/components/SkinRenderer.js`:
   ```js
   case 'my-skin':
     return <MySkin style={style}>{children}</MySkin>;
   ```
3. Add label to `SKIN_LABELS` in `constants.js`
4. Done. The skin is live.

---

## Enabling Firebase Later

1. `grep -r "FIREBASE-TODO" src/` — shows every spot to update
2. `npm install firebase @react-native-firebase/app @react-native-firebase/firestore`
3. Add `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
4. Implement the 3 functions in `src/services/sync.js`
5. Set `synced = true` after successful push in `useSync.js`

Conflict resolution: use `updated_at` (last-write-wins already modelled).

---

## Build APK (Android)

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

Upload the `.apk` to itch.io or share directly.

---

## Notes

- All media saved to `FileSystem.documentDirectory/NoteFlex/`
- No network calls in v1 — 100% offline
- `synced: false` flag set on every local edit, ready for Firebase push
- `react-native-sketch-canvas` may require `expo prebuild` for native modules
