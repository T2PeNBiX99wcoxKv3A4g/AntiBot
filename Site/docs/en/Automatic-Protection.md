# Automatic protection

When a user reaches the threshold, AntiBot runs the actions you enabled in **Settings → Automatic protection**. The local actions go first because they need no server; the API calls queue behind each other because VRChat rate-limits them.

## The actions

| Action | Needs OSC | What it does |
| --- | --- | --- |
| Close VRChat | no | Quits the client normally, so the leave packet is still sent. |
| Safe Mode (OSC) | yes | Presses VRChat's panic button, replacing every non-friend avatar at once. |
| Switch avatar (OSC) | yes | Asks VRChat to wear the avatar id from the settings. |
| Block the user | no | Calls the VRChat API. |
| Disable avatar interactions | no | Calls the VRChat API. |
| Hide the chat box | no | Calls the VRChat API. |

## Order

1. **Close VRChat** is started on its own task and does not hold up anything else. If the client really quits, the OSC actions are skipped because there is nothing left to protect.
2. **OSC** (Safe Mode, avatar switch) is sent right away, before the API queue.
3. **API** (block, avatar interactions, chat box) runs one call at a time, about three seconds apart.

## Friends and whitelist

Friends are treated like whitelisted users and are never acted on. Your own account is never scored. Add a user id to the whitelist to leave them alone even when their score is high.

## API pacing

VRChat allows roughly one moderation request every few seconds. AntiBot keeps to that pace and retries a request that is refused instead of dropping the action.

## When it does not run

- The user's score is below the threshold.
- The user is a friend, whitelisted, or your own account.
- The same user was already handled in this instance.
