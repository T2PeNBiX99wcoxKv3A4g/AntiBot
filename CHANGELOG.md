# Changelog

## [0.10.2](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.10.1..v0.10.2) - 2026-11-14

### ⚙️ Miscellaneous Tasks

- Update PhotinoNetUtils bridge to version 0.27.0 - ([03e61f2](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/03e61f2f8fc757d18f8a7c08f054440f8a4cad1e))

### Action

- Update version and update `CHANGELOG.md` - ([8de6afb](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/8de6afb7021b77aa3f7cd5021afdd3410ec1ee27))


## [0.10.1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.10.0..v0.10.1) - 2026-11-13

### ⚙️ Miscellaneous Tasks

- Update photino-net-utils-bridge to v0.26.1 - ([cb79b4c](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/cb79b4c923f05e841ba99e97af690e4cc8b8d6ea))

### Action

- Update version and update `CHANGELOG.md` - ([7d09e7f](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/7d09e7f0d0cb24dd749377e7c4bde22762a0f479))


## [0.10.0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.9.1..v0.10.0) - 2026-11-13

### ⛰️  Features

- *(ui)* Render the changelog as markdown - ([0fb4cc3](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/0fb4cc3bad8332f33d59014d1791cabe403fd917))
- *(ui)* Put icons on the update buttons - ([8981796](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/8981796bc191303d49f819e7c17519fd4da4ee55))

### 🐛 Bug Fixes

- *(ui)* Close the menus when the window loses focus - ([7274b0e](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/7274b0ee06546c75d1d2b7e836da5084ada60dbd))

### ⚙️ Miscellaneous Tasks

- Update photino-net-utils-bridge to v0.26.0 - ([fe79352](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/fe793521c0afce6e14e566f79dbe519fc5d9d1fe))

### Action

- Update version and update `CHANGELOG.md` - ([f6cd8e4](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/f6cd8e4dd5c5f4f6e6599cce7b8b750d521cbb85))


## [0.9.1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.9.0..v0.9.1) - 2026-11-13

### ⚙️ Miscellaneous Tasks

- Add photino-net-utils-bridge v0.25.1 - ([3faf243](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/3faf243718098a464daf5e7fbd500b2856f9789c))
- Update photino-net-utils-bridge to v0.25.1 - ([f47e452](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/f47e452b39408be4717f05152dcc333a6a6192ba))
- Build with the .NET 11 SDK - ([3ce5890](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/3ce58903634bce10047b879939f2136de3bf7871))

### Action

- Update version and update `CHANGELOG.md` - ([ce0cda3](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/ce0cda3f483e8e069d79fafa0251a01769c13884))


## [0.9.0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.8.0..v0.9.0) - 2026-11-13

### ⛰️  Features

- *(auth)* Save passwords and automatic sign-in per account - ([eb0e2e4](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/eb0e2e47c97a3a095f1f392b2269971c656d43ce))
- *(auth)* Delete rejected saved passwords and cap auto sign-in - ([61bc79d](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/61bc79d606183436dc3ce61aab7a1f2ad5dfc5eb))
- *(auth)* Reuse saved cookies for saved-password sign-in - ([09689f4](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/09689f40cda514895171d25c6a7b9d10f05fc321))
- *(auth)* Add a manual saved-password sign-in mode - ([03d928b](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/03d928b7fd5fb682070c9476c7ff0ec1f70a782c))
- *(batch)* Add batch actions with a shared moderation queue - ([9b3949c](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/9b3949c77f13c697daf173ed61add45d134d3c0f))
- *(threat)* Fetch every bio and move automatic sign-in to the account page - ([9ebc4b1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/9ebc4b11b2acfe635fc2ab1c011689c38d7d6484))
- *(threat)* Add oversee bio signals and keep batch actions undoable - ([377201d](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/377201dde0298d8b704d9bcdf96782bff6964731))
- Install the update when the download finishes - ([ca79502](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/ca79502df730ae23a13e82407dc55c2af140baa1))
- Score joins and leaves on their own loop - ([5438623](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/5438623ddfaa4699df5d6382e6a7eea4b6d4ac88))
- Add a light and dark theme setting - ([1e0a019](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/1e0a0197f0b93e5f9a43a950f8250457e5031d14))
- Mark debug builds in the footer - ([a8df5e5](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/a8df5e5d703d369226d831120a427b3cd6b2d221))
- Generate localization keys and clamp settings ranges - ([6aa7c15](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/6aa7c15573a9dff8b5786b48268c2f2ae5a8aceb))
- Generate the settings TypeScript types - ([cddbb74](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/cddbb74864024c79902f52eab671653875255049))
- Add Windows update download and install flow - ([ade73f4](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/ade73f4ed8ac11eb3da60681f7d47d398cf7626a))

### 🐛 Bug Fixes

- *(account)* Keep the session save method on the account page - ([6f6b068](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/6f6b0686ae532b30ed05da5a371b0d02c005d822))
- *(auth)* Reuse each account's last session storage choice - ([a0c807f](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/a0c807f953e9a8b8c596c546e70c4aab3fa12ee8))
- *(auth)* Show the save panel after login and keep the login options visible - ([9b86cb2](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/9b86cb23a08f4e732626ccc09f9d9d715ba5fec4))
- *(auth)* Prefer the last signed-in account for automatic sign-in - ([bc899ac](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/bc899acce5ab1834aebe4ab68247ef2f196680f1))
- *(auth)* Keep saved accounts on the sign-in page and hide login names - ([146d183](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/146d1830455dc102e67e5f187867861a83b64d9b))
- *(batch)* Reset the previous progress when parsing a new list - ([d860f9c](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/d860f9cf474474218fa07dda16d8981e5ff33ed4))
- *(i18n)* Follow VRChat's Chinese wording as well - ([89f12ec](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/89f12ecc953df149b8c8b39fae7ebfccc5375358))
- *(i18n)* Follow VRChat's Japanese wording for the instance labels - ([8ce39e9](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/8ce39e9d66af4d06e99feff456f0272937bc12dd))
- *(i18n)* Translate the remaining Japanese entries - ([da45ef6](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/da45ef6e1804d1544dd37a4334a60825386b085c))
- *(threat)* Score bot-style generated names at 20 - ([331c9f9](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/331c9f994a95b6bbfe469be31618dcfb64e46504))
- Retry Safe Mode when VRChat does not confirm it - ([cb988e8](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/cb988e87307e24a4b5db02efd272d58c9bc61fb4))
- Remove duplicate translation keys - ([0d0291d](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/0d0291d81c5904fce3b7a34b37031e286f778fd8))

### 🚜 Refactor

- *(i18n)* Use path-shaped keys - ([4e5d760](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/4e5d760ddff043de945cd9cb9a22801261efbec3))
- Streamline formatting and organize imports - ([7e7e6f0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/7e7e6f0bb180736e9931d0cdb5de9eafee0d2649))
- Read the typed translator straight from the bridge - ([6652b45](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/6652b45cf05e91bccee4d3ea6d492698a1e9468c))
- Augment the bridge with this app keys - ([689dd8d](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/689dd8d4a00a639f159b8577863039c9b74cf3a3))
- Take the app and update client from the bridge - ([8181efd](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/8181efdee1814ae48961e4bcf559fc7dd4a2e1c5))
- Type translation keys from the generated union - ([2714874](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/271487437cb19124e14bd606caf7d03c172fb474))
- Type the settings from the generated model - ([9a49613](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/9a496138a00a1dcd70a6de988905a648e524af88))
- Remove unused using directives and use target-typed new - ([a18d398](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/a18d3988009b3754ac0005d2a179f62e3ae2c56d))
- Use primary constructor in settings service - ([9900e56](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/9900e56164350c9e74cfc9ed88e6312506c8e6f1))
- Let the settings base own Instance - ([2733c40](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/2733c401c4f9960b9c807e9a1bd3ae9cfebe0e2a))
- Drop sealed from the singleton declarations - ([36039c5](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/36039c5b231ee0271f34b67ac67487006d6e7015))
- Drop redundant singleton touches - ([2521b97](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/2521b9778fb41b2a5e1dd2f7a8cc3c041a097b00))
- Make the singleton constructors private - ([58e28eb](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/58e28eb243d06c8bdaaf0206d815cb7144fbd997))
- Mark services with [Singleton] - ([1451a09](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/1451a098887f69005936c09f8b36b5286d5b27d2))
- Initialize the message handlers from Program - ([1be0ffc](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/1be0ffc3b0deff1690ee985999e00fe1616fa507))
- Drop the AppLinkService wiring - ([16a667e](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/16a667e6b1b300eaec086671203ea3a9e7fa1e44))
- Subscribe AppLinkService through NativeBridge - ([0cdb230](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/0cdb23094a12fbab6dbd6268a7a688e7b6a84f8d))
- Adopt the shared source generators - ([c4a3922](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/c4a39229c46e42db1db2c544df0c4332e4ca8b44))
- Use the shared settings service base - ([ab214d0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/ab214d001b7de137160c87447e0a522355c4e0f6))
- Store settings as TOML - ([90e5cd3](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/90e5cd36ddef2e20a9cfdc809fc2186bc22ade63))
- Use collection expressions - ([8ed7dcb](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/8ed7dcbbe496572cbdc76ce9998c97a5a28d8374))
- Move settings file handling into the shared store - ([4b72261](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/4b7226196a955d4970df1de47367a28d4fbb0940))
- Let UpdateOptions derive the release page URL - ([3cd9147](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/3cd9147a9cca8a6d147c9ce3e2669819aa6c3ac9))
- Use the shared app info and startup services - ([c31dfba](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/c31dfba67336fef0a3ebdd5a56ab2fc49defbb5d))
- Use the shared web view cache and event queue - ([10ce89a](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/10ce89ad7c6cc78c9a0ae42445b5d5d1bcbcad83))
- Streamline formatting and organize imports and member declarations - ([717bfba](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/717bfbae1eb358a98a9a2fd1be2345e5a5423a59))
- Send notifications through the shared service - ([1f8f7d3](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/1f8f7d3c16eb68b1eb4719d4e68fccf89586e8c5))
- Use target-typed new expressions - ([eed677f](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/eed677fd089432e98756e8e2310d0a5ca33ca697))

### 📚 Documentation

- *(i18n)* Keep VRChat's wording for Join Me and Ask Me - ([d836505](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/d836505d31d5767a7daaebde509bda2037839f60))

### ⚙️ Miscellaneous Tasks

- Update photino-net-utils-bridge to v0.25.0 - ([3d61c0b](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/3d61c0be6111cdb0354de546bea6a451beb5feb4))
- Sync the settings generator - ([37a8b35](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/37a8b356f87c198e5616a3d0ab688ca8da1dc6fa))
- Sync the settings generator - ([12aa732](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/12aa7327a25f5da5f88c7fdb1941c45756d0e6c2))
- Sync the shared settings generator - ([2bd527a](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/2bd527ac7063fc81c46529b11b0b130c3f605ffb))
- Sync the shared settings generator - ([d098012](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/d098012c0d3343632a267809311e43cbce69fef9))
- Update photino-net-utils-bridge to v0.23.0 - ([908916d](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/908916d4307584e23719777e453e157a876887f8))
- Update photino-net-utils-bridge to v0.21.0 - ([ea49e6f](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/ea49e6f15e4af5afb7977e6f981ccb1232028b5a))
- Update PhotinoNetUtils bridge to version 0.20.2 - ([f3d6499](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/f3d64990e5ccc9141200f6de896fce6a304f06d8))
- Update photino-net-utils-bridge to v0.20.0 - ([a5a22be](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/a5a22be9b3e8addff99b9272e214e92a6f6abd5a))
- Refresh the code generator binaries - ([7712275](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/771227529fb79c76f455a0d8ccd1aaa31bf174f0))
- Update photino-net-utils-bridge to v0.19.0 - ([f0f51f0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/f0f51f04921668959dd9161720108c0564f40045))
- Update the settings generator - ([3f792fc](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/3f792fc41af74455c19f126c5d607c95eecad0b4))
- Update the shared generator - ([5a3e817](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/5a3e817f4f5366a0a98919b589d3492c34778a13))
- Update the shared generator - ([5f09e69](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/5f09e69d6c9af00b8f174d9f9b47a7ff46056fca))
- Update the shared library - ([d1762e2](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/d1762e26c0dcad80e3f5035a65016b0382513734))
- Update the shared library - ([98f95db](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/98f95db665e9366840ad73d4810b8a87a9a4d48f))
- Update the shared library - ([126b556](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/126b55680a8efa41d11c95d73ba85b6311eaefc2))
- Target .NET 11 - ([731b401](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/731b4019c4754aaf7a149e3cf860e627fabc8525))
- Add OS platform annotations to notification service - ([c9ea41a](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/c9ea41aebbb2330de87d18c2b315243bae6115d0))
- Update PhotinoNETUtils to 0.16.1 - ([9b7e81d](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/9b7e81d67d8301a138091cc916d51868b6eee364))
- Update photino-net-utils-bridge to v0.16.0 - ([d673e84](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/d673e84a1ba20d74638bd502da2b8d8a5080844b))

### ◀️ Revert

- Touch the singleton instead of the bootstrap - ([400c821](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/400c821d2f2b007e5e1bf7bf13fac23114bca886))

### Action

- Update version and update `CHANGELOG.md` - ([fd565e9](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/fd565e9e1c0d3f6c492196c8cebdc9a1d0f43734))

### Build

- Generate the settings types from the compiled model - ([45e54c4](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/45e54c43d073f2ddf90273efe8de915914fc2da7))
- Use the per-platform code generator - ([9cf755e](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/9cf755e0aabd1f1f02954a3e0902256f615e05c0))
- Run the native settings generator - ([6c16965](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/6c169658f50f6ca1a27dbf21779a38fb8d96e8ed))


## [0.8.0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.7.5..v0.8.0) - 2026-11-11

### ⛰️  Features

- *(auth)* Add optional automatic sign-in and louder session alerts - ([2a35c5b](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/2a35c5bd00648a7866228780f7f9f72249476644))
- *(auth)* Remind the user with toasts when the session expires - ([acf15bb](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/acf15bb315c6a261e8e6458a120e1305bd601fd9))

### 🐛 Bug Fixes

- *(deps)* Keep Babel 7 for vite-plugin-svgr - ([46ec4b4](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/46ec4b4b798f8b83a8d0c1ab61ac1074b1200dbd))

### Action

- Update version and update `CHANGELOG.md` - ([f1320d1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/f1320d1aa6cf5ad1d46a9074e7d5e44170dd8056))


## [0.7.5](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.7.4..v0.7.5) - 2026-11-10

### ⚙️ Miscellaneous Tasks

- Update NuGet packages - ([c13c4f0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/c13c4f029b6bf7f0b770a4fcf5c185fb838f87cd))

### Action

- Update version and update `CHANGELOG.md` - ([0a7497b](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/0a7497b2599b4af6bd5d8fe2fe8c06ae03373c3f))


## [0.7.4](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.7.3..v0.7.4) - 2026-11-10

### ⚙️ Miscellaneous Tasks

- Update node dependencies and shared PhotinoNETUtils - ([9a674e6](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/9a674e6c94edd6858c75a47f40bbe093061b30a6))

### Action

- Update version and update `CHANGELOG.md` - ([243f457](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/243f457ba0dbec2fd0e3b7c61b0b28435c05d7b6))


## [0.7.3](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.7.2..v0.7.3) - 2026-11-10

### ⚙️ Miscellaneous Tasks

- Update PhotinoNETUtils to 0.14.0 - ([8d2b0c7](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/8d2b0c722e812b5d5f94ecbda755283a102a1bab))

### Action

- Update version and update `CHANGELOG.md` - ([11bdfd9](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/11bdfd9bc2a7b4f2902013515da6b6e1c0391f57))


## [0.7.2](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.7.1..v0.7.2) - 2026-11-09

### ⚙️ Miscellaneous Tasks

- Update PhotinoNETUtils to 0.13.0 - ([356386e](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/356386e46d89fd78f3cdff839b0fae2747ab8c46))

### Action

- Update version and update `CHANGELOG.md` - ([4f1a05f](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/4f1a05f01fe30de37d3099d3486c54626d136584))


## [0.7.1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.7.0..v0.7.1) - 2026-11-06

### ⚙️ Miscellaneous Tasks

- Update shared PhotinoNETUtils to 0.12.1 - ([014a8e9](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/014a8e99006036e48286d88adf4b6d779b1f8092))

### Action

- Update version and update `CHANGELOG.md` - ([7a0e10d](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/7a0e10d91c65885973917972f1c32f09af61aa7e))


## [0.7.0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.6.1..v0.7.0) - 2026-11-06

### ⛰️  Features

- Recover blank WebView and add tray reload - ([b650fd4](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/b650fd45c4609c90ed419f22faf3a0d1da018c62))

### ⚙️ Miscellaneous Tasks

- Update PhotinoNETUtils dependency - ([e7220a1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/e7220a19e7ade3fe36fa7adae7f2afe611e1ab70))

### Action

- Update version and update `CHANGELOG.md` - ([f2d1719](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/f2d17198ea6ad2aa258120474b6115df0aec82d3))


## [0.6.1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.6.0..v0.6.1) - 2026-11-05

### 🐛 Bug Fixes

- *(auth)* Open the sign-in form when a saved session expired - ([435dc06](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/435dc060caa8df085857d063e3adf60b0b1bcb0b))

### Action

- Update version and update `CHANGELOG.md` - ([1ba93d4](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/1ba93d431c8acdcf48e228491115a0722b6e647a))


## [0.6.0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.5.1..v0.6.0) - 2026-11-04

### ⛰️  Features

- *(i18n)* Default to the system language - ([462fbde](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/462fbde3bc5d97525b833c824ebf63ea43f6c8f5))

### Action

- Update version and update `CHANGELOG.md` - ([686f755](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/686f7557546d4d8d9ee6d0723806047d3814f5df))


## [0.5.1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.5.0..v0.5.1) - 2026-11-03

### ⚙️ Miscellaneous Tasks

- Update photino-net-utils-bridge to v0.11.0 - ([85a62d2](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/85a62d2a99629702bcbc6ae0524e7c9d77712342))

### Action

- Update version and update `CHANGELOG.md` - ([e14d005](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/e14d00574baafbccd40e13358765465653c8c8b1))


## [0.5.0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.4.1..v0.5.0) - 2026-11-02

### ⛰️  Features

- *(auth)* Detect and announce expired sessions - ([46cc7b8](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/46cc7b8e5688d814ff4b80fd464eec6b5a2d27ce))
- *(site)* Add detection limits to the home page - ([e2f9ced](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/e2f9cedd1e90c66143d65cd11bbdc1204c0a1f6b))

### 📚 Documentation

- Clarify modified-client bot limits - ([997460c](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/997460c91250d702430f297a339ec07fc48804a2))

### Action

- Update version and update `CHANGELOG.md` - ([4c301fa](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/4c301fa313e9e0379a9234d55e9f146844bd1902))


## [0.4.1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.4.0..v0.4.1) - 2026-11-02

### 🐛 Bug Fixes

- *(ui)* Open update settings from the footer dot - ([8493a14](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/8493a14f9290e875d66632fed7accc6aabd9d112))

### Action

- Update version and update `CHANGELOG.md` - ([bc64aea](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/bc64aeaabfbf1bb659303232ff2a5cc973444d6a))


## [0.4.0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.3.0..v0.4.0) - 2026-11-02

### ⛰️  Features

- *(ui)* Show update indicator in the footer - ([b31632b](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/b31632be8139e1a53f87ee840dd1921cb5698562))

### Action

- Update version and update `CHANGELOG.md` - ([fbffa94](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/fbffa9424f4834b6cd3ec9991f3e476de5575cd8))


## [0.3.0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.2.0..v0.3.0) - 2026-11-02

### ⛰️  Features

- *(site)* Make docs and home pages indexable - ([e8d146c](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/e8d146cbced2a5bf5cf2f475e20276b9c0ad1e4e))
- *(site)* Add social preview metadata - ([dc36b6f](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/dc36b6f8691f1321468ae844dc6793156cc7253f))

### 🐛 Bug Fixes

- *(i18n)* Remove duplicate OSC suffix from settings - ([a351898](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/a351898b940d0ba6903438b30bd456782e62f51d))

### 🚜 Refactor

- *(site)* Keep every language in the SPA - ([b01ea30](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/b01ea30aa7b08a658757cc4abb781413779811ae))
- *(site)* Keep docs navigation in the SPA - ([7381912](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/738191293a866d21d429af9fc5e72cd802df6cfc))

### ⚙️ Miscellaneous Tasks

- *(site)* Add Google Search Console verification - ([7cf3404](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/7cf3404daacf12d3d3ced530a8fa63bd076fc4ca))

### Action

- Update version and update `CHANGELOG.md` - ([c943c98](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/c943c982ec7b47db7297cf18f3c3ae0e693de33c))


## [0.2.0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.1.2..v0.2.0) - 2026-11-02

### ⛰️  Features

- Add update check and log folder shortcut - ([40292f8](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/40292f80892fb14233a6a3aa2f92c64309711373))

### Action

- Update version and update `CHANGELOG.md` - ([f27a8af](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/f27a8af7daee45d4b8793b03a2a90f5efcb182e4))


## [0.1.2](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.1.1..v0.1.2) - 2026-11-02

### 🚜 Refactor

- *(docs)* Improve table formatting in README files across all languages - ([4b88e4d](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/4b88e4df81e5e3a91069de1ccbf3920a35d5e66b))

### 📚 Documentation

- Credit VRCX for the API implementation - ([2b975dc](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/2b975dc68379eb3aa3f1909aff63f592fd7b6316))

### ⚙️ Miscellaneous Tasks

- Refresh the site and pre-release workflow files - ([2a6b11b](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/2a6b11bfc9de45ebdfddbe0f615b178595644b6a))

### Action

- Update version and update `CHANGELOG.md` - ([8011a84](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/8011a84b0d08f6352f0b094937b75dea9e87dced))


## [0.1.1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/compare/v0.1.0..v0.1.1) - 2026-11-02

### 🐛 Bug Fixes

- Shut down cleanly on SIGTERM - ([38b5d6d](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/38b5d6de449baf0411ced64947cf3d4d1374d239))

### ⚙️ Miscellaneous Tasks

- Bump the nuget group with 1 update - ([7f46415](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/7f464150c849de155e7d98289700b3aee5aec8b5))

### Action

- Update version and update `CHANGELOG.md` - ([e3254af](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/e3254af66d24a8cd4abedc19a9dd4faa13025b31))

## New Contributors ❤️

* @github-actions[bot] made their first contribution in [#1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/pull/1)
* @dependabot[bot] made their first contribution

## [0.1.0] - 2026-11-02

### ⛰️  Features

- *(account)* Switch by clicking the whole row and stop the sign-in flash - ([dcf911e](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/dcf911e8236aa1f06ca3c36dc838b744d3bd2b1d))
- *(account)* Keep one folder per VRChat account and switch between them - ([de428a1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/de428a140de3d17d3a83d4e03760c15ee8b6e4cb))
- *(account)* Turn the sign-in form into a centered login page with an inline QR code - ([9d3fe48](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/9d3fe488fd27dd92ea1b921dc8338bc8c9f2108d))
- *(account)* Make the storage choice a save-only modal - ([575c0ae](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/575c0ae52dc9353f6d30482eb72602f337e5a9f3))
- *(account)* Keep rank names in English and collapse saved encryption choices - ([7fdaa0f](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/7fdaa0fb0ac85f19d84b3c68b79414bd399aece6))
- *(account)* Order session storage by security strength - ([19bedb8](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/19bedb8fa3d2ddee5daba84c8eb3676c4da17cb8))
- *(auth)* Add Windows Hello and Linux TPM session storage - ([1173939](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/1173939db21a87f8c92caaf005764f8989655f6c))
- *(auth)* Add TPM session storage and show when the session expires - ([dae83e1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/dae83e179fe91fb64d850ed0b0abc69ddf9ac19b))
- *(auth)* Sign in to VRChat and prefer the API for instance data - ([0bf9824](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/0bf982413bd0d23035d701f4b134b2bedcd0a04e))
- *(cache)* Keep bios in the database and refresh them in the background - ([5708288](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/5708288fcc64b3be7f6a968991bbc995063296a2))
- *(debug)* Add a graceful VRChat close button and stop forcing the quit - ([ced2cdc](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/ced2cdce0697d86b754d62f834f8d70e591879ea))
- *(debug)* Add a debug-only page for returning home and scoring users - ([f40027b](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/f40027b1a258adbb845f0f5e0296d43ac0774111))
- *(instance)* Drop the robot badge and leave the threat reason to explain it - ([0e001ff](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/0e001ff3dd1a1f070af2db757dab399fbc820b22))
- *(instance)* Colour threat reasons by whether they raise or lower the score - ([480650e](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/480650e2e3ba392fc0f762f491d1c9b6792fbfd2))
- *(instance)* Restore the time spent in the instance - ([e4c2ba2](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/e4c2ba236ffa464ca64be8e4523c153251b69bbf))
- *(instance)* Tint rows by self, friend or risk and refresh join times - ([ad79db4](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/ad79db4fdf3ce897b58c6c6e194e853ed4517aaa))
- *(instance)* Read the whole log for join times and order players like VRChat - ([a2888af](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/a2888afd0597a3dd4bd3cb58a8a63e7faf9e33df))
- *(instance)* Resolve avatars from iconUrl and show bio with a profile link - ([2e3b35c](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/2e3b35c24eef9bde12e6e4ce7247403b496b897a))
- *(instance)* Read avatar names from the file API and show presence text - ([777e3ac](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/777e3ace356ef642bbb0f3fa13b6816afdb0b52c))
- *(instance)* Show status, platform and instance details; add avatar providers - ([2bb6511](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/2bb6511b71a5c827f7175b83ed62e12b2eca7ff8))
- *(instance)* Flag the default Robot avatar and resolve avatar names - ([53995d6](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/53995d6650de97f3380bb9188a30773cb515eb6a))
- *(instance)* Show each player's current avatar and profile details - ([e7da0e6](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/e7da0e65aae5a7051833880feb3045f2eef2812e))
- *(instance)* Persist game log events and cache player profiles - ([2947065](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/2947065f422533bf4cb8864b43b33f7906a011cc))
- *(instance)* Build the in-instance player list from the log - ([ef3e450](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/ef3e450c0f12dba6474e1c22516ba85d9006ec7d))
- *(logs)* Export the read log and trim placeholder copy - ([907abcd](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/907abcd656bd733213d1d618dca44be661d93f42))
- *(logs)* Follow VRChat only while it runs and keep the last session - ([52aff54](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/52aff544d3ee264a2d8d77d466afa54f24476500))
- *(logs)* Follow the newest VRChat log in a live viewer - ([ce6f6b6](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/ce6f6b62cc0f332446b6ffd2490c0b05b8716d1e))
- *(operations)* Undo actions, resolve avatars and open the user panel - ([1cb7b86](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/1cb7b864bd27a03881117580d664bf7d17b388f6))
- *(presence)* Unify status through the VRChat pipeline websocket - ([1d1f1ca](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/1d1f1ca3d4aa8e92592d8f058212af48a484ff72))
- *(profile)* Load bios on demand and keep the details panel current - ([03a0d2c](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/03a0d2ca3a59a786e55b9874e4a8ca1f57b14f42))
- *(requests)* Add a clear history button - ([4332451](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/4332451e0859f8e929643309e87e4ffdcfa9c537))
- *(requests)* Add pronouns and a friend request history page - ([b475278](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/b4752783074e7a8f8045db013db7001faec8ef4f))
- *(settings)* Add an OSC section with a port and a connection test - ([11b96d3](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/11b96d39af17f8a4e3a4fe9229167d7aa0217f9d))
- *(settings)* Save every control on change and drop the save button - ([472d6fa](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/472d6fae410fcd11b63d4c9307b983544a8fea98))
- *(settings)* Add a floating section jump list - ([425d426](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/425d42614ba382a7f212559799a5c74a2b68ca2d))
- *(settings)* Use a custom dropdown and open attribution as a page - ([f038f45](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/f038f456a7104e4401dfabf714e7d5eb5146ceff))
- *(settings)* Add localization, startup controls and open source notices - ([27a3624](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/27a36245761f08ab4c8450baa6512adff048d2e7))
- *(site)* Add the OSC and avatar docs, match the app palette, and animate the page - ([681bbfa](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/681bbfa384ef2a767db8672242add4095b6e8546))
- *(site)* Add a landing page built from the URLCheck site and deploy it to Pages - ([177407b](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/177407b497e1b5b24df9d1ed61eb578424bd8f54))
- *(threat)* Score old accounts below zero, down to -40 at five years - ([333f765](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/333f76549ae19b374ef177c90c7fca189516de35))
- *(threat)* Switch to a chosen avatar over OSC and show threat as a score - ([2bfb7a9](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/2bfb7a96f67b30d377567ea859b5736d9367b3b3))
- *(threat)* Turn on VRChat's Safe Mode over OSC when a user reaches the threshold - ([c6b196c](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/c6b196c95b59abb461f06d0920c4e792a3e05ea2))
- *(threat)* Close VRChat before an avatar can download, off by default - ([dbeef84](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/dbeef84a4ceefd78118509019cb0b830c918d966))
- *(threat)* Go home through the client's launch link instead of a self invite - ([0db5563](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/0db5563d1d607ebb5317b3581d8873cacc94881d))
- *(threat)* Weigh account age and centre the rank scale on User - ([4777600](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/4777600c9a65a266462fe79d1824d7db40ac4fbb))
- *(threat)* Halve the score for iOS users too - ([4fcd2ff](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/4fcd2ff7b87601be00c0d6886620062f318a2b98))
- *(threat)* Halve the score for Quest users - ([7e38c15](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/7e38c15f9e4c3ed4377559b5fba22bc959d232ef))
- *(threat)* Rebalance scoring around names, trust and fuzzy profile text - ([63422b8](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/63422b8080d19232cd8a4be5e545d87bd4e0f705))
- *(threat)* Run automatic actions in priority order - ([ae682d7](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/ae682d79ef7eff6eeac3f0ff84b087f620f8efcb))
- *(threat)* Smooth threat colours, clearable operation log and system notifications - ([d5245e5](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/d5245e53403bb9a6b31f8507f76f1af1319ec675))
- *(threat)* Score users, auto-moderate high threats, add whitelist and operation log - ([389db6a](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/389db6a9560d705b69f2ce519d5f286389c9e6b6))
- *(tray)* Localize the menu and add a settings shortcut - ([8efbc14](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/8efbc14e12572eb5fcea240e407cbeca03356b2f))
- *(ui)* Offer copy-id, copy-profile and whitelist on every user row - ([8062860](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/8062860e6e745b952fa6bdc506a8b138882daf22))
- *(ui)* Add the right-click menu with copy and quick whitelist for users - ([6637940](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/6637940cfcc148592f6421cd16ee0686731d349b))
- *(ui)* Explain what is unavailable while signed out - ([1c0ee5f](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/1c0ee5f7227bb0979c237c413d70b14ec7b73146))
- *(ui)* Draw the window title bar in the interface and retune the palette - ([17c106c](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/17c106cc1398c8015c38157c9c2a9bf6c92615ba))
- *(ui)* Use a blocked-account mark and retitle the app tagline - ([634e36d](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/634e36dfb0273f1a0570608eb7aa8e3da0185372))
- Add the installer scripts, list the Linux packages on the site, and animate the app pages - ([e837790](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/e83779008235a51d85f6c43efc120dfe6536cfaa))
- Draw the window corners on Linux - ([b45e65e](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/b45e65ec05c747b01b24fbeb50fc9af73bfdf93d))

### 🐛 Bug Fixes

- *(account)* Open the add form, cache avatars, and stop the QR client being torn down - ([74bec96](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/74bec96b42357757143a1e6fe1aff4a8f8af009d))
- *(account)* Let saving an unchanged storage choice close the panel - ([13b27f4](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/13b27f4e8870a403d759d396d6e0ffe8887d19b2))
- *(account)* Disable save until the choice changes and refresh presence - ([be0cb1d](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/be0cb1db91f901a9c0f17b52717fb73b44b73e26))
- *(account)* Select the stored mode and use the profile icon - ([669e754](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/669e7544bb59a0ad53cd1771d48dbce71ace141a))
- *(account)* Mask the login username like a password - ([c03ac37](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/c03ac3778d26ef5ba15509313114d7fc28bb4cf4))
- *(account)* Give the password fields a working reveal and mask the account name - ([df434d6](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/df434d6ad02635d176d3ae46eb5fecbdee092ff0))
- *(auth)* Fall back to the avatar when the profile has no icon - ([c0a6b9f](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/c0a6b9fcbff6ecc0ab59af404fce6bfde953b18e))
- *(build)* Reference securifybv.ShellLink so the shortcut refresh can run - ([e3ca40f](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/e3ca40f12116065a183ef3e6c0550ef61eb21506))
- *(instance)* Hide stale API instances while VRChat is not running - ([d10a23b](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/d10a23b6d7741a42f837cb0776d78ab35a573e40))
- *(instance)* Clarify the platform label and unknown avatar name - ([7d69d0a](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/7d69d0a13717fae54da19653bf2bd7c1b3d57461))
- *(instance)* Wait for the session before fetching and keep the workers alive - ([93d2259](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/93d22591633d5cc56305275a13a6fc10ea19bda8))
- *(instance)* Stop clearing the roster on any player leaving and draw list avatars round - ([e8b3e1c](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/e8b3e1c5f95439620c6977a8a6393de7bf1c282c))
- *(instance)* Put every badge icon before the instance name - ([ddb62ed](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/ddb62ed8e5ad9f8058062c263e202c7667de8877))
- *(instance)* Draw the region flag as SVG and show it first - ([3ab475d](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/3ab475df8a41360653d55fa794e403412f411e87))
- *(instance)* Keep the real status text and the last snapshot across polls - ([cf2af6c](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/cf2af6cf513997196fbfaeb22697faa184ab8dbf))
- *(operations)* Do not toast when an action is undone - ([700b9ac](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/700b9ac01c06ae7def8192b8a04afaca0ed27cb5))
- *(operations)* Unmoderate with the original type and show undo feedback - ([df807b5](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/df807b54d3686885fa1f72729152c5725c4aa7aa))
- *(osc)* Press the panic button on every threat instead of throttling a local message - ([a758b19](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/a758b194beeb73e000105b45af978088b86d01e3))
- *(osc)* Re-arm Safe Mode after a short gap instead of trusting a state that cannot be read back - ([de9f005](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/de9f005c94948e611a7d71807e0b1b263448cd8f))
- *(osc)* Let a Safe Mode press expire when the log never confirms it - ([6e66c28](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/6e66c283de8ccb45483ee2bfdfc519ad3db9699f))
- *(osc)* Recognise PanicMode as Safe Mode and let the debug button force a press - ([61ea976](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/61ea976e75e6031ba2fb7a95afe46c333f56f427))
- *(osc)* Default the port to 9000, save it as it is typed, and turn Safe Mode on by default - ([845d2fd](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/845d2fde83dbeaa1a1908dc0dde52e950cfe8210))
- *(requests)* Only visible requests are pending and refresh on pipeline notifications - ([770c05b](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/770c05baa9c41e07a71309f4ea3027c8a2a6c2f7))
- *(settings)* Let an empty avatar provider list really turn the lookups off - ([66fe381](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/66fe3810a4941feca233ea35743d9d5a0c1cb91a))
- *(site)* Let the text use the full content width and match the app's CJK fonts - ([7dc8006](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/7dc8006bd640eb35ae462958144e8e814df65e07))
- *(threat)* Stop the return-home loop and never score the signed-in account - ([64986c4](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/64986c4d90263302af3b406222b05c3d9f3087cd))
- *(threat)* Create a home instance with the owner and retry other types - ([31c6f65](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/31c6f65c15384d522696e4982636a9ea1e098c13))
- *(threat)* Make return home resolve the home world and create an instance - ([540b6e5](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/540b6e548910887ac676c9b7a38580c8544c0720))
- *(threat)* Treat friends as whitelisted for automatic actions - ([95d0e58](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/95d0e58d54a79897123657cdd71e97be3d8ed538))
- *(threat)* Pace moderation calls and stop flagging symbol names - ([335ffb5](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/335ffb5ea4bfb7b616172568b931aed5579f0c3a))
- *(threat)* Stop flagging normal names and speed up profile lookups - ([9411a3d](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/9411a3d48f601eb0ec60f688562ff63467490938))
- *(ui)* Draw every sidebar icon at the same size - ([dc3011f](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/dc3011f934a429b2ac95d67241b699f9a5a02cad))
- *(ui)* Hold events until the page is ready so a restored session shows - ([8864f75](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/8864f7572a1176739b7695cca066fe68d00affd4))
- *(ui)* Grey out unavailable storage modes and merge the status fields - ([140c120](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/140c12077963d59459f180cbea862e40342d8397))
- *(window)* Refresh the Start Menu shortcut on Windows - ([695b2f2](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/695b2f2a58125d9e1eb4a1d091a444ff9698ff07))
- Keep the log pinned to the bottom, and accept links wherever an id is asked for - ([f36535d](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/f36535d2f82450808b2c67afecbb14661aa24bd2))
- Show the system session storage again and mask player ids - ([7129fa0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/7129fa0de03a8926d6794819aaae373c784af9a2))
- Let the interface draw the frame on Wayland - ([b58318b](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/b58318bef4f06b3b956aa6b9c9332264023e435b))

### 🚜 Refactor

- *(instance)* Load player details in parallel and rebuild the user row - ([0bf81ec](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/0bf81ec4beb03418eecdd1c94236992d7c4c36be))
- *(logs)* Read the VRChat log asynchronously - ([519f84b](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/519f84ba8e1bc14e79a8404e49527b31444e9ea6))
- *(threat)* Drop the automatic return-home action - ([5235e90](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/5235e90eb9ceedd031c1a9802f5f21b7800433ba))
- Use shared Photino helpers - ([84c8711](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/84c8711ba7df89528ada4dc1cc5e2a970fc3a517))
- Streamline code and improve formatting across all service and model classes - ([9034788](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/90347881b4b4c0c8f6e0eedd4b8f381a30001a62))
- Adjust lambda formatting in AntiBot/Program.cs for improved readability - ([799ca73](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/799ca73eeade4a8f4aa75eee6cb850f686b500be))
- Improve code readability and formatting across multiple files - ([c8a299c](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/c8a299c29709a56ea962458f80c191c344d749b0))
- Store settings in the roaming folder - ([6a0cf53](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/6a0cf533c2555b7ddb4788fad56f5c896030e9dd))
- Use the shared window chrome hooks - ([6614beb](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/6614beb7a99d2a6d202fefeec31d1be692874514))
- Use the shared native bridge - ([efbc3d6](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/efbc3d6d6924779af9a1f00b2f80305a0ce73d5b))
- Use the shared window chrome and app paths - ([09ec161](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/09ec1614d36b1949806b2da5cc602e637739c215))
- Adjust attribute ordering in index.html for consistency - ([7b9dcd1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/7b9dcd1302b4b495eece9ed91eb751bf46606834))
- Reformat App.tsx for improved consistency and readability - ([d7deb56](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/d7deb56dc121d99b2ad221fecdb0112e7c75c671))
- Suppress ReSharper warning for disposed closure access - ([60655c0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/60655c0cb7557c8cc6caf89cd1d659a34b16426e))

### 📚 Documentation

- *(settings)* Put the safe avatar id under its toggle and spell out which ids work - ([c9593f5](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/c9593f57f0f6733c8dac269394cc960bbd2f3aa7))
- *(settings)* Describe what rejecting a friend request really does - ([e47b6a9](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/e47b6a9879711a135564a438679acfad29561ff5))
- *(settings)* Explain what each automatic action is for - ([90e3068](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/90e3068ae84f00026c03fc722f6c2742dd5ced5b))
- *(settings)* Describe the block action without the avatar wording - ([fe53318](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/fe533187193c086ac99276713a959acafff97a76))
- *(settings)* Make the close-VRChat hint say why it exists - ([b245a26](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/b245a26221cdc96a2199f231d5d6a3ebc70791e3))
- Add Japanese and Chinese READMEs - ([fa63eaa](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/fa63eaa4b6c6aa41e2686c24db6ea62eafc58bc6))
- Add project README - ([3cd623e](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/3cd623e3ebcaa3129f48c7571a8e5c1716475ba3))
- Replace README content with TODO placeholder - ([bc277f7](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/bc277f71886283ace0abdadc6ab04e07d923ef48))

### ⚡ Performance

- *(instance)* Fetch avatar names only after the profile, with an empty placeholder - ([fdab3f8](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/fdab3f8e7641f979d1a15a1cb131af866c3e2eaa))
- *(instance)* Coalesce redraws and fetch profiles in parallel - ([462705a](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/462705a3378fb4407ec103da649ed802f625f5a5))
- *(threat)* Send the local OSC actions before the rate-limited API queue and never block on the close - ([7a96832](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/7a968328a2a1667094eb61585d73e3041c043694))

### 🎨 Styling

- *(instance)* Strengthen the red threat background gradient - ([4517f24](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/4517f24301a65a5a6e08d29c36516faf121c7bf8))
- *(instance)* Keep the column headers on one line - ([75ee056](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/75ee056375a1f4a1f902175a2c33ac978fdc292c))
- *(instance)* Centre the platform column - ([e528668](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/e528668d864cf1bedd1c3ffa6566c3605ac02a20))
- *(instance)* Compact the PC/VR platform label - ([a561849](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/a561849dedf87bbd9b5a681b22daed7f90de30b1))
- *(instance)* Space the player total after the slash - ([a0009f9](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/a0009f912153618ed83ffc24332baadffe83780d))
- *(instance)* Render the player total smaller and muted - ([5910d7b](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/5910d7bf7b2043944e5292dfefde6e098d9e5ba5))
- *(instance)* Stop the world backdrop shrinking on narrow windows - ([2552ae6](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/2552ae668aa14c8bce498673f950a006a108ee4e))
- *(instance)* Narrow the world backdrop to a quarter of the card - ([3c945d3](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/3c945d3c84fdd0c98b927288371b868c632ab4d7))
- *(instance)* Keep the world backdrop to the left half and tidy the player count - ([801ff88](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/801ff88989c426ba0e60def96f7a15146294ae9b))
- *(instance)* Use the world thumbnail as the card backdrop - ([4165e3a](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/4165e3ab8ceccd6bf569e41c9221afb2c22635c4))
- *(operations)* Show undo actions in green - ([ac9b304](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/ac9b3040f8254423384094d1d8d127e204f932d1))
- *(operations)* Link each action to its VRChat profile and shorten the player count - ([686f551](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/686f55109403963f889a7f94ece4bc98812a3ab0))
- *(settings)* Place the jump list on the right and enlarge the notices page - ([59c6598](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/59c65982263c5e5f564f3062910ad8e033c16d1e))
- *(settings)* Stack the floating jump list vertically - ([bd28b98](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/bd28b98fbb8ffbc58fac3da4d04a3ef38d5d9227))
- *(settings)* Float the section jump list above the cards - ([77c1f67](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/77c1f67e19ac30741aa1112e53cf2cdb0ce73033))
- *(settings)* Keep the dropdown translucent with a blur - ([de602f0](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/de602f0ae137dc9a8a2e50ab01b9049206fe3268))
- *(settings)* Blur the dropdown surface - ([694c0e8](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/694c0e8bb7051e47b705eca263f321540e61d035))
- *(settings)* Group the startup options together - ([70368d7](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/70368d7f08e355b884c693b92b0e573257db9507))
- *(settings)* Move the save button below the protection sections - ([9dcc00c](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/9dcc00caa12181fb87c79ebb6f481b06bfe8d3c4))
- *(ui)* Drop the repeated status text and right-align line count and version - ([3a78a51](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/3a78a51bf1df25244efdf40ec3e0861b5978eab0))

### ⚙️ Miscellaneous Tasks

- *(site)* Drop the OSC note from the install section - ([55a3b5e](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/55a3b5e27e902a7584fabad808a1a02c26c80c2a))
- Update photino-net-utils-bridge to v0.9.0 - ([1835e10](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/1835e10c131647d3f865983c60e14694ec520108))
- Add MIT license file - ([50c8d7a](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/50c8d7aae7844af5221a07d66b6688ad1fdd3239))
- Update photino-net-utils-bridge to v0.8.3 - ([d89c8fa](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/d89c8fa148c77e747c79529bc0d5ff4891bc63e9))
- Pick up the hardened window frame and log unhandled exceptions - ([78d7016](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/78d7016d46b18a53915fa5aafad8c709ebfd2f4c))
- Update photino-net-utils-bridge to v0.8.2 - ([2fe7d7e](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/2fe7d7e3d55cbf70ceecfac65bfaa8dc2c1e7317))
- Remove unused JavaScript file `index-C7T-_xMk.js` from project assets - ([3e242bc](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/3e242bced8a50e8f9ea77256b23762a6fba94398))
- Update photino-net-utils-bridge to v0.8.1 - ([76ccc4a](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/76ccc4a991c4871176e4f5ac8f847e79f034bbd3))
- Update `.gitignore` - ([a495770](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/a4957708d0c25f66afb7ec9afa6412106e166023))
- Update photino-net-utils-bridge to v0.7.1 - ([463239c](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/463239c8ea25b178b2d4feb740be956ca886ee8b))
- Update PhotinoNETUtils library in AntiBot - ([572ed6f](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/572ed6f7ede4f99ffa215c3acbae4fb37bfb12fe))
- Refresh the shared library build - ([a8ad294](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/a8ad294ce9d8428d3ef8669c8eff3284411a8a81))
- Refresh the shared library build - ([9c4569e](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/9c4569e23865e7fc221cf489e4e0f16340cc4214))
- Update PhotinoNETUtils library in AntiBot - ([260ad54](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/260ad54442a0220032de44301975cdaa503c71e1))
- Update photino-net-utils-bridge dependency to v0.5.0 - ([959272e](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/959272e183e59c1281261b5866b7ae83eed9c9b6))
- Update photino-net-utils-bridge dependency to v0.2.1 - ([dd17fa1](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/dd17fa12f2d9a0134c931f5a378e385c2e90321f))

### Init

- First commit - ([91facc9](https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/commit/91facc92920c43ecbbe16c5d03fe9bd76ed49d7d))

## New Contributors ❤️

* @opencode-agent[bot] made their first contribution
* @T2PeNBiX99wcoxKv3A4g made their first contribution

<!-- generated by git-cliff -->
