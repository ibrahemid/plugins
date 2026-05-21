# How the rate limiter works

TL;DR: token-bucket per business, refilled by a cron every 10 seconds, enforced in NestJS middleware before any business logic runs.

## The bucket

Each business has a Mongo document holding `tokens` and `lastRefilledAt`. Default capacity is 100, default refill rate 10 per second. The capacity and rate are configurable per business via the admin panel.

## The middleware

Reads the bucket on every request. If `tokens >= cost`, atomically deducts via `findOneAndUpdate({ _id, tokens: { $gte: cost } }, { $inc: { tokens: -cost } })` and proceeds. If the condition fails, returns 429 with `Retry-After` computed from the refill rate.

## The refiller

A cron job runs every 10 seconds. It tops up any bucket that hasn't hit capacity, capped at the bucket's max. Uses the same atomic `findOneAndUpdate` so concurrent middleware deductions don't lose increments.

## Gotchas

Clock skew between app pods can cause one pod's middleware to deduct before another pod's refiller cron lands. The drift is bounded by the cron interval and we accept it — the worst case is a 429 that should have been a 200, which the client retry handles.

For burst traffic above capacity, the bucket goes negative; the next refill cycle brings it back. We considered hard-limiting at zero but the current behavior is simpler and works at our scale.
