# AntiBot

A desktop tool aimed at the automated-account ("bot") problem in VRChat.

This repository is no longer only a scaffold. The application shell, IPC bridge, tray, single-instance
handling and build pipeline are in place, and the first piece of the pipeline is implemented: a live
view of the newest VRChat output log. Detection and scoring are not implemented yet.

## The problem

VRChat instances are regularly joined by automated accounts that spam, scrape avatars, harass
players, or inflate activity. AntiBot is intended to make those accounts visible early — from local
signals such as the VRChat log, account metadata and session behaviour — and to give the user a
clear place to review alerts before taking action.

The direction is:

1. **Observe** — follow VRChat's local log and the user's session for join/leave events.
2. **Classify** — score accounts using configurable signals (account age, repeated joins, login
   patterns, avatar and profile traits, group history, and so on).
3. **Review** — present evidence and confidence, never a black-box verdict.
4. **Act** — locally alert, block at the user's level, or keep a history for later reports.

Nothing in this scaffold decides that an account is a bot.

## Layout

```
AntiBot/
├── AntiBot/                       # .NET host
│   ├── Program.cs                 # bootstrap, tray, single instance
│   ├── Constants.cs
│   ├── Messaging/                 # JSON bridge between React and C#
│   ├── Models/
│   ├── Services/                  # app info, VRChat log follower, window manager
│   ├── Libs/                      # PhotinoNETUtils.dll + shared front-end bridge
│   └── UserInterface/             # Vite + React + TypeScript
├── AGENTS.md
└── README.md
```

The shared Photino plumbing (window/tray/static server/logging/bridge) lives in
[PhotinoNETUtils](../PhotinoNETUtils). Its DLL and npm tarball are copied into `Libs/` with that
project's `build-and-copy.ps1`.

## Requirements

- .NET SDK 10
- Node.js 20.19+ (or 22.12+)
- The `PhotinoNETUtils` artifacts already present in `AntiBot/Libs`

## Development

```bash
# terminal 1 - Vite dev server on port 3200
cd AntiBot/UserInterface
npm install
npm run dev

# terminal 2 - desktop host
dotnet run --project AntiBot
```

Debug builds load `http://127.0.0.1:3200`. URLCheck uses 3000 and YetAnotherFileManager uses 3100,
so the three can run together.

## Production

```bash
cd AntiBot/UserInterface
npm run build   # copies the build into Resources/wwwroot
cd ../..
dotnet build -c Release
```

The interface is embedded in the assembly and served by the shared Kestrel static server on an
OS-assigned loopback port.

## VRChat log

The log viewer follows the newest `output_log_*.txt` in
`%USERPROFILE%\AppData\LocalLow\VRChat\VRChat` (or VRChat's Proton prefix on Linux). The file is
opened for reading with `FileShare.ReadWrite | FileShare.Delete`, so VRChat keeps writing to it while
it is being read, and a new session log is picked up automatically instead of staying on the old one.

`ANTIBOT_VRCHAT_LOG_DIR` overrides the folder, which is useful for testing without a VRChat session.

## Current status

- [x] Window, tray, close-to-tray, single instance
- [x] React shell and native bridge
- [x] `app.info` and the live log viewer (`log.snapshot`, pushed `log.lines`)
- [x] VRChat log observation, including switching to the newest session log
- [ ] Detection signals and scoring
- [ ] Alerts, history and user actions
- [ ] Settings and persistence

The UI reports whether a log is being followed; nothing is classified or blocked.
