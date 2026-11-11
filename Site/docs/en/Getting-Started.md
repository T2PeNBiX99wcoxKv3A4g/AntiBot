# Getting started

AntiBot reads the log VRChat already writes, shows who is in your instance, and scores every user who joins. Above your threshold it can act before their avatar finishes loading.

## What you need

- Windows or Linux, x64. The download is self-contained, so the .NET runtime does not need to be installed.
- VRChat running on the same machine. AntiBot reads its log, so it only knows about an instance while VRChat is in it.
- OSC enabled in VRChat for the two actions that use it: Safe Mode and the avatar switch. See [OSC](OSC).

## 1. Sign in

Use the same VRChat account you play with. AntiBot asks for the email code and the two-factor code when VRChat does, and can remember the session behind Windows Hello or a password you choose.

The account is only used to call the VRChat API for profiles and moderation. The password is used for the sign-in request; if you turn on automatic sign-in, it is kept encrypted with the TPM or DPAPI so an expired session can be restored.

## 2. Point it at the log folder

The default is:

```
%USERPROFILE%\AppData\LocalLow\VRChat\VRChat
```

AntiBot tails the newest `output_log_*.txt` in that folder. It does not need a mod, a plugin or a patched client.

## 3. Set a threshold

The threshold is a score from 0 to 100. Every new user is scored, and the reasons are shown next to the score. Nothing happens below the threshold, and friends and whitelisted users are never acted on.

See [Threat scoring](Threat-Scoring) for what goes into the number, and [Automatic protection](Automatic-Protection) for what happens above it.

## 4. Pick the actions

Open **Settings → Automatic protection** and turn on what you want. Safe Mode and the avatar switch need OSC; everything else works without it.
