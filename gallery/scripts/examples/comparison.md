# Auth library for the new dashboard

Three real candidates. Pick on what you optimize for. All would work.

## Option A: Clerk

Managed service on the Vercel marketplace. Drop-in middleware, pre-built sign-in UI.

Pros
- Drop-in middleware, under an hour to wire up
- Best DX of the three by a wide margin
- Free up to 10k MAU

Cons
- Vendor lock-in if you outgrow it
- Pricing scales with MAU past the free tier

Effort: 1 day

Recommended for speed.

## Option B: Auth0

Industry standard. More flexible than Clerk, more setup overhead.

Pros
- Mature, well-documented
- Configurable to any auth flow

Cons
- Heavier to integrate
- More config surface area to learn

Effort: 3 days

## Option C: NextAuth (self-hosted)

Fully owned, open-source, no SaaS in the loop.

Pros
- No vendor lock-in ever
- Free, forever

Cons
- Maintenance burden lands on you
- Security responsibility on the team

Effort: 1-2 weeks
