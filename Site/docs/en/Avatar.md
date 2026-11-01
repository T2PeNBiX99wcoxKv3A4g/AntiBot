# Avatar

The avatar switch is the only action that changes what you are wearing. It is off by default.

## The avatar id

VRChat identifies avatars with an id that starts with `avtr_`, for example:

```
avtr_4d3c393f-ef70-4468-bb9e-8380f8a43d8f
```

Paste it under **Settings → Automatic protection → Switch avatar (OSC)**. The field is masked like a password; use the eye button to check what you pasted.

## Which avatars can be switched to

Only avatars that VRChat already lets you wear without the website:

- avatars in your **favourites**
- avatars in your **recents**
- your **own uploads**

Anything else is ignored by VRChat without an error, so a public avatar you never favourited will not load.

## Where to find the id

Open the avatar's page on `vrchat.com` and copy the `avtr_…` part of the address, or use the id shown on your own avatar list in VRChat.

## What happens on a match

When a user crosses the threshold, AntiBot sends:

```
/avatar/change avtr_…
```

It does **not** switch back automatically. Switch back yourself when the instance is calm, or use the same field with a different id.

## The current avatar

AntiBot listens to VRChat's OSC output on UDP 9001. VRChat sends `/avatar/change` whenever the avatar changes, so AntiBot knows what you are wearing and skips the request when it is already the target.

See [OSC](OSC) for enabling OSC and checking the port.
