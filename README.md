# Grounds to Gather

A warm, Nairobi-based coffee storefront for discovering and ordering thoughtfully roasted coffee.

## Stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS, next-themes, lucide-react
- Prisma with PostgreSQL/Neon
- Safaricom Daraja Lipa Na M-Pesa Online
- Resend and React Email

## Getting started

```bash
git clone https://github.com/Uuuuu77/grounds-to-gather.git
cd grounds-to-gather
npm install
cp .env.example .env.local
npm run dev
```

Set the environment variables before using payments or email. Run Prisma migrations with the project’s normal database workflow before using order routes.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `RESEND_API_KEY` | Server-side Resend API key |
| `RESEND_EMAIL_DOMAIN` | Verified sender domain |
| `NEWSLETTER_ADMIN_TOKEN` | Secret for the newsletter broadcast route |
| `MPESA_CONSUMER_KEY` | Daraja consumer key |
| `MPESA_CONSUMER_SECRET` | Daraja consumer secret |
| `MPESA_SHORTCODE` | Dedicated Safaricom shortcode; sandbox defaults to `820820` |
| `MPESA_PASSKEY` | Daraja Lipa Na M-Pesa passkey |
| `MPESA_CALLBACK_URL` | Public callback URL for STK results |
| `MPESA_ENV` | `sandbox` or `production` |

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve a production build
- `npm run typecheck` — TypeScript validation
- `npm test` — unit tests
- `npm run test:e2e` — Playwright tests
- `npm run lint` — ESLint

## Color tokens

The design system separates colors by the surface they appear on:

- `light-surface` and `light-surface-muted` are fixed cream-card colors. Use them for card content, quantity fields, and other surfaces that stay light in both themes.
- `theme-surface`, `theme-border`, and `page-text` are page-background tokens. They resolve to explicit light and dark values because the page background changes with the theme.
- `accent-selected` and `accent-selected-bg` are reserved for selected, counted, or active states. Use the selection indicator together with the accent so state is never communicated by subtle border color alone.

Avoid inline color values and avoid using theme-linked foreground colors inside fixed light surfaces. Add new semantic tokens when a new surface category is introduced.

## Integrations

Payments use Safaricom Daraja STK Push for M-Pesa. The account reference is the order ID so payments can be reconciled. Daraja production access requires Safaricom approval and production credentials.

Transactional invoices and newsletter broadcasts use Resend. The newsletter endpoint sends a supplied, pre-written HTML update to the stored subscriber list; it does not provide a content editor.

## Deployment

Deploy the Next.js app with Vercel and connect the production PostgreSQL database through Neon. Configure all production environment variables in Vercel, use a public HTTPS callback URL, and keep Daraja in sandbox until the complete test order flow has been verified.
