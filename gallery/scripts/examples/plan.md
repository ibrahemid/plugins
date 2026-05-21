# Add Instagram messages

Plan mirrors the existing Messenger module; same Graph API surface, same 24-hour messaging window constraint.

## Phase 1: Config module

Mirror messenger.

- [ ] instagram-config.schema.ts with igBusinessId, pageId, accessToken, businessId
- [ ] CRUD controller + service
- [ ] OAuth callback for IG Business Login
- [ ] Reuse Meta Embedded Signup with config_id scoped to instagram_basic, instagram_manage_messages, pages_messaging

## Phase 2: Webhook ingestion

- [ ] Parse IG webhook payload (entry[].messaging[].sender.id, message.text, attachments)
- [ ] Resolve businessId by matching entry.id against InstagramConfig
- [ ] Normalize into existing Message schema with platform: INSTAGRAM
- [ ] Replace the no-op in webhook-event.dispatcher.ts:37 with instagramWebhookProcessor.process(body)

## Phase 3: Outbound sender

- [ ] POST to graph.facebook.com/v21.0/{ig_user_id}/messages with recipient.id (IGSID) + message
- [ ] Handle 24-hour messaging window — return platform error to caller, surface in UI
- [ ] Support text, media (image/video/audio), quick replies, generic templates

## Phase 4: Frontend

- [ ] /conversations — add Instagram filter chip, IG icon next to chat avatar
- [ ] /settings/instagram — new page mirroring /settings/whatsapp
- [ ] Update useChatQueries to pass platform filter
- [ ] Admin: /platforms — add Instagram column showing connected businesses

## Phase 5: Env

- [ ] Reuse META_APP_ID, META_APP_SECRET, META_VERIFY_TOKEN
- [ ] Add INSTAGRAM_CONFIG_ID (Embedded Signup flow ID)
