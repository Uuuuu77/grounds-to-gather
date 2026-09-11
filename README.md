# Grounds to Gather — Website Build Prompt

Paste this into v0 or Claude Code as the working spec. Build in the numbered order at the bottom. Each numbered step is its own prompt if you want to go one chunk at a time.

## Stack

- Framework: Next.js 14+, App Router, TypeScript
- Styling: Tailwind CSS + shadcn/ui
- Animation: Framer Motion, used sparingly (fade-ins, hover states, one scroll reveal on the story section)
- DB: Neon Postgres
- ORM: Prisma with the Neon serverless driver
- Hosting: Vercel
- Repo: GitHub, connected to Vercel for auto-deploy on push to main
- Payments: Flutterwave (single integration covers M-Pesa STK push and Visa/Mastercard for Kenya)

## Brand

- Legal name: Grounds to Gather Coffee Roasting Company LTD
- Display name: Grounds to Gather
- Tagline: "Grounded in Grace. Gathered in Love."
- Story: sourced from the highlands of East Africa, roasted in Nairobi. Each bag funds jobs in Nairobi and pays farmers fairly.
- Colors: coffee brown #6F4E37 (primary), dark chocolate #3B2412 (headers, footer, buttons on hover), warm white #FDFBF7 (background), cream #E8DCC8 (cards, borders)
- Typography: one serif for headings (warmth, craft feel), one clean sans for body and UI. Keep to two font families total.
- Visual approach: few images, used deliberately. One hero shot of a bag or pour, one farm/origin shot on the story section, product photos on the shop grid. No stock photo filler.

## Site map

1. Home — hero, one-line story, shop CTA, three trust points (sourced in East Africa, roasted in Nairobi, sustainable jobs)
2. Shop — product grid
3. Product detail — bag photo, weight, price, add to cart, short origin note
4. Cart — drawer or dedicated page, editable quantities
5. Checkout — contact + delivery details, payment method, order summary
6. Story / About — full brand copy provided below
7. Contact — WhatsApp CTA, email, floating WhatsApp button on every page

## Data model

```
products
  id            uuid, pk
  name          text
  slug          text, unique
  description   text
  weight_g      integer
  price_ksh     integer
  image_url     text
  stock         integer
  active        boolean, default true
  created_at    timestamptz, default now()

orders
  id              uuid, pk
  customer_name   text
  phone           text
  email           text
  address         text
  items           jsonb        -- [{product_id, name, qty, price_ksh}]
  subtotal_ksh    integer
  status          text         -- pending, paid, failed, fulfilled
  payment_method  text         -- mpesa, card
  payment_ref     text         -- Flutterwave transaction ref
  created_at      timestamptz, default now()
```

No customer accounts for v1. Guest checkout only. Add accounts later if repeat orders justify it.

## Cart and checkout flow

- Cart state lives client-side: React context + localStorage. No DB write until checkout starts.
- Checkout form collects name, phone, email, delivery address.
- Payment method toggle: M-Pesa or Card, both handled through Flutterwave.
- Order flow: create a `pending` order row first, initiate the Flutterwave transaction from a server-side API route (secret key never touches the client), verify the transaction on the Flutterwave webhook, then update the order to `paid`.
- Confirmation page shows order summary and a WhatsApp link pre-filled with the order number, as a manual fallback if the customer wants to confirm delivery details directly.

## Payment integration

- Sign up at Flutterwave, grab test keys first, go live keys later.
- Env vars: `FLW_PUBLIC_KEY`, `FLW_SECRET_KEY`, `FLW_ENCRYPTION_KEY`, `FLW_WEBHOOK_HASH`
- Use the Flutterwave inline/standard checkout from an API route, not client-side secret exposure.
- Webhook route verifies the `verif-hash` header against `FLW_WEBHOOK_HASH` before trusting any payload.
- Test both paths before going live: M-Pesa STK push prompt on a test number, and a test card number from Flutterwave's docs.

## WhatsApp integration

- Floating WhatsApp button, bottom right, all pages.
- Link format: `https://wa.me/254XXXXXXXXX?text=` + URL-encoded message.
- Use on: contact page, product page ("ask about this bag"), order confirmation page.
- Replace `254XXXXXXXXX` with the real number before launch.

## Seed data (dummy, replace once real photos and pricing land)

```json
{
  "name": "East Africa Highlands Roast",
  "slug": "east-africa-highlands-roast",
  "description": "Sourced from the highlands of East Africa, roasted in Nairobi. A cup that gathers your table and builds a future at its source.",
  "weight_g": 250,
  "price_ksh": 1250,
  "stock": 50
}
```

## Story page copy (use as-is)

> Some of life's best moments happen around a shared table: a warm cup, good company, and conversation worth lingering over. We started Grounds to Gather to serve those moments.
>
> This bag was sourced from the highlands of East Africa and roasted in Nairobi, drawing out the character and flavor of each bean.
>
> But it's about more than what's in your cup. Every bag creates sustainable jobs in Nairobi and honors the farmers behind every harvest. The same cup that gathers your table builds a future at its source.
>
> We hope this coffee does what its name suggests: bring people together.
>
> Grounded in Grace. Gathered in Love.

## Verification and security notes

- `npm run typecheck`, `npm test`, and `npm run build` are the local verification baseline.
- Playwright browser coverage is configured with `npm run test:e2e`; the sandbox may require system Chromium libraries before it can launch.
- Response headers include `X-Content-Type-Options`, strict referrer policy, HSTS, a restrictive Permissions Policy, and report-only CSP.
- `npm audit --audit-level=high` currently reports high-severity transitive Prisma development-tool advisories involving Hono. The application has no Hono runtime dependency; upgrading Prisma requires a breaking-version review.
- No payment webhook route or Flutterwave secret-key usage exists in the current application, so webhook verification remains a pre-launch integration requirement rather than an active endpoint.

## Deployment

1. Push repo to GitHub.
2. Import the repo into Vercel, connect the `main` branch for auto-deploy.
3. Add `DATABASE_URL` (Neon), Flutterwave env vars, and the WhatsApp number as Vercel environment variables. Never commit them.
4. Run Prisma migrations against Neon before first deploy.
5. In the Vercel project, go to Domains, add the custom domain, and update the DNS records at the registrar exactly as Vercel specifies (A record or CNAME depending on whether it's a root domain or subdomain).

### Custom domain: `groundstogather.com`

The configured Vercel domain is `groundstogather.com` — with the `s` in `grounds`. `groundtogather.com` is a different hostname and will not verify against this project unless it is added separately in Vercel.

The current “Invalid configuration” error means the domain is assigned to this Vercel project, but its DNS is still delegated to Google Domains rather than Vercel. Fix it at the domain registrar using one of these supported setups:

**Option A — keep registrar DNS (recommended if other records exist):**

- Root/apex `@` — `A` — `76.76.21.21`
- `www` — `CNAME` — the exact Vercel target shown in the project’s Domains panel (commonly `cname.vercel-dns.com`)
- Remove conflicting apex A/AAAA records and conflicting `www` CNAME records.

**Option B — delegate DNS to Vercel:**

- Replace the registrar nameservers with `ns1.vercel-dns.com` and `ns2.vercel-dns.com`.
- Do not keep a mixture of old Google Domains nameservers and Vercel nameservers.

After saving the registrar change, allow DNS propagation, then return to Vercel and use Domains → `groundstogather.com` → Refresh/Verify. Vercel can issue the certificate only after the DNS records resolve correctly. Do not commit DNS records, tokens, or registrar credentials to this repository.

The repository cannot change registrar DNS automatically; the nameserver or DNS-record update must be made in the registrar account that controls `groundstogather.com`.

## Iteration v10 scope

The subscription cadence label and stored cart value now use `twice-monthly`, displayed as “Twice a Month,” with twice-monthly delivery copy. Resend email notifications and Flutterwave payments are intentionally deferred until their integrations and environment variables are connected; no email or payment endpoint is active in this partial iteration.

## Build order

1. Scaffold Next.js + Tailwind + shadcn/ui, set the brand palette as Tailwind theme tokens.
2. Build the base components: header, footer, buttons, cards, floating WhatsApp button.
3. Home page: hero, tagline, three trust points, shop CTA.
4. Prisma schema + Neon connection, seed script with the dummy product above.
5. Shop page: product grid pulling from the DB.
6. Product detail page.
7. Cart context + cart drawer, quantity edit, remove item.
8. Checkout page: contact form, order summary, payment method toggle.
9. Flutterwave integration: server-side transaction init, webhook verification, order status update.
10. Order confirmation page with WhatsApp fallback link.
11. Story page with the copy above.
12. Contact page.
13. Animation pass: Framer Motion fade-ins on scroll, hover states on buttons and product cards, one page-transition effect. Keep it light, nothing that slows the site down.
14. Responsive QA: mobile first, test cart and checkout end to end on a small screen.
15. Deploy to Vercel, connect Neon, connect the domain.
16. Swap dummy product data and copy for the real photos and final pricing once the client confirms them.
