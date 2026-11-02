# Threat scoring

Every new user gets a score. It starts at 0 and has **no upper limit**: several strong signals can push it past 100. The threshold in the settings is 0–100, so anything above 100 always crosses it.

It is a guess, not a verdict: a real person can score high, and a bot can score low.

> **What it can and cannot tell apart**
>
> AntiBot is aimed at automated bots that connect through modified clients to collect data such as
> avatars, voice and player information. A real person using a modified client can look almost
> identical, and a high trust rank does not prove that an account belongs to a human. The score
> cannot reliably separate the two; treat it as a hint, not a judgment.

The score is the sum of the reasons shown next to it, and each reason carries its own points. Green reasons lower the score, red ones raise it.

## Account age

| Account created | Points |
| --- | --- |
| under 7 days | +40 |
| under 30 days | +35 |
| under 90 days | +25 |
| under 180 days | +15 |
| under a year | +8 |
| 1–2 years | 0 |
| 2–3 years | −10 |
| 3–4 years | −20 |
| 4–5 years | −30 |
| 5 years or more | −40 |

## Trust rank

`User` is the middle of the scale.

| Rank | Points |
| --- | --- |
| Trusted User | −10 |
| Known User | −5 |
| User | 0 |
| New User | +10 |
| Visitor | +30 |
| probably Nuisance | +30 |
| Nuisance | +60 |

## Name patterns

| Pattern | Points |
| --- | --- |
| a four-character hex suffix (`Blackfir3 ed36`) | +10 |
| digits mixed into the name (`rokun0304`) | +10 |
| a long letter-digit-letter run (`katou230791jp`) | +20 |

The name signals are capped at 40 in total, so a name alone cannot reach the default threshold.

## Profile text

The custom status, pronouns and bio are matched after punctuation is normalised, so lookalike characters do not dodge the check.

| Text | Points |
| --- | --- |
| suspicious wording (`hexed`, `banned`, `collect avatars`, …) | +5 |
| `hexed` | +10 |
| `check bio` | +5 |
| `hexed.cc` | +100 |

## Avatar

| Avatar | Points |
| --- | --- |
| named "Sex Bot" | +10 |
| VRChat's default Robot avatar | +5 |

## Platform

Quest and iOS are very unlikely to host a bot, so on those platforms the rest of the score is halved.

## Friends and whitelisted users

Friends are treated like whitelisted users: they are never scored and never acted on. Your own account is never scored either.
