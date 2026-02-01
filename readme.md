# Sportzy

Backend API for managing sports matches and live commentary, with a WebSocket channel for real-time updates.

## Tech Stack

- Node.js (ES Modules)
- Express
- Drizzle ORM (Postgres)
- Zod
- WebSocket (ws)
- Arcjet (HTTP + WS protection)

## Features

- CRUD-style match creation and listing
- Commentary feed per match
- WebSocket subscriptions for live updates
- Arcjet bot protection and rate limiting
- Seed script for demo data

## API Routes

### Matches

- `GET /matches` — list matches (supports `limit`)
- `POST /matches` — create a match
- `PATCH /matches/:id/score` — update score for a live match

### Commentary

- `GET /matches/:id/commentary` — list commentary (supports `limit`)
- `POST /matches/:id/commentary` — create commentary entry

## WebSocket

- Endpoint: `ws://<host>:<port>/ws`
- Subscribe payload:
  - `{ "type": "subscribe", "matchId": 123 }`
- Unsubscribe payload:
  - `{ "type": "unsubscribe", "matchId": 123 }`
- Events:
  - `match_created`
  - `commentary`

## Environment Variables

Required:

- `DATABASE_URL` — Postgres connection string
- `ARCJET_KEY` — Arcjet API key

Optional:

- `HOST` — bind host (default: `0.0.0.0`)
- `PORT` — server port (default: `8000`)
- `ARCJECT_MODE` — `DRY_RUN` or `LIVE` (Arcjet mode)
- `APMINSIGHT_LICENSE_KEY` — APM Insight license key (used in apminsightnode.json)

Seed script:

- `API_URL` — base API URL for seeding (e.g. `http://localhost:8000`)
- `DELAY_MS` — delay between commentary inserts (default: `250`)
- `SEED_MATCH_DURATION_MINUTES` — duration for generated matches (default: `120`)
- `SEED_FORCE_LIVE` — set to `false` to allow non-live matches

## Scripts

- `npm run dev` — start dev server
- `npm run db:generate` — generate Drizzle artifacts
- `npm run db:migrate` — run database migrations
- `npm run db:test` — run DB connectivity test
- `npm run seed` — seed matches and commentary via REST API

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Configure environment variables in `.env`.
3. Run migrations:
   ```
   npm run db:migrate
   ```
4. Start the server:
   ```
   npm run dev
   ```

## Notes

- Commentaries are scoped to a match via `:id`.
- Validation is handled using Zod schemas in `src/validation`.
- Database access is via Drizzle in `src/db`.
