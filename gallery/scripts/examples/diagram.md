# Webhook ingestion flow

The accept-fast, process-durably path. Meta gets a `200` before any business logic runs; retries are owned by the worker, not Meta. The dispatcher routes by platform — Instagram lands on a no-op until the IG processor exists.

```mermaid
graph LR
  Meta[Meta Webhooks] --> Controller[WebhookController]
  Controller --> Repo[EventRepository]
  Repo --> Mongo[(Mongo · events)]
  Controller --> Drain[Drain Worker]
  Drain --> Repo
  Drain --> Dispatcher[WebhookEventDispatcher]
  Dispatcher --> WAS[WhatsApp Service]
  Dispatcher --> MES[Messenger Service]
  Dispatcher --> INS[Instagram noop]
  WAS --> Chat[ChatService]
  Chat --> Msg[MessageService]
  Chat --> AI[Mastra Orchestrator]
  AI --> Graph[Graph API]
```

Hover any service to trace its callers and callees. Click to pin the focus.
