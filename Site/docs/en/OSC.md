# OSC

VRChat's OSC input lets a local program press buttons in the client. AntiBot uses it for the two actions the API cannot do:

- **Safe Mode** — replaces every non-friend avatar at once.
- **Avatar switch** — asks VRChat to wear a different avatar.

Both are optional. Blocking, avatar interactions and the chat box all work without OSC.

## Enable OSC in VRChat

1. Open the Action Menu.
2. Go to **Options → OSC**.
3. Set **Enabled** to on.

VRChat then listens on UDP port **9000** on the loopback interface. AntiBot finds the port from VRChat's log (`Advertising Service … of type OSC on 9000`), so it knows whether OSC is available.

## Check it in AntiBot

Open **Settings → OSC**:

- **OSC port** — 9000 unless VRChat was started with a custom `--osc` port.
- **Test connection** — sends a message that opens VRChat's Quick Menu. If the menu opens, OSC works.
- The line below the button shows whether VRChat advertised an OSC port this session.

The port is saved as you type, and the test uses the value in the field even before it is saved.

## What AntiBot sends

| Address | Used for |
| --- | --- |
| `/input/PanicButton` | Safe Mode |
| `/avatar/change` | Avatar switch |

`/input/PanicButton` only turns Safe Mode **on**; it does not toggle it off. AntiBot sends it for every user that crosses the threshold, which is harmless when Safe Mode is already on.

## How the current avatar is known

VRChat sends its own OSC output on UDP port **9001**, including `/avatar/change` whenever you change avatar. AntiBot listens there, so it can skip the switch when you are already wearing the target avatar.

If another program already uses port 9001, AntiBot keeps working; only the avatar check is lost.

## Turning Safe Mode off

VRChat does not accept an OSC address that turns Safe Mode off. Turn it off in the Action Menu (Safety) or by pressing the panic key combination again. The next user above the threshold turns it back on.
