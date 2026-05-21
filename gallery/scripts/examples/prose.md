# Webhook flow

Webhook detection is wired in `WebhookController`. The dispatcher routes to per-platform processors. Instagram is currently a no-op which makes adding it straightforward.

The core pattern is **accept-fast, process-durably**: Meta gets a 200 before any business logic runs. Retries are owned by the worker, not Meta.

## Where to start

Open `webhook.controller.ts`. Three routes worth knowing:

- `GET /webhook` — Meta verification handshake using `hub.verify_token`
- `POST /webhook` — classifies `body.object` and hands off to the repo
- `webhook-event.dispatcher.ts` — routes by platform

Storage is a single events collection keyed by `SHA-256(body)`, which gives idempotency for free when Meta retries the same payload.

## Gotchas

The in-memory `processingMessages` Set is **per-process**. If you horizontally scale, two pods may double-handle the same message ID within the same DB tick. The DB-level `platformMessageId` unique index is the actual idempotency guard, not the in-memory Set.
