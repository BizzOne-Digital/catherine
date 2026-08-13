# Lumina Medi Spa

Next.js 14 medi-spa site with MongoDB CMS and Stripe Checkout for retail products.

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in MONGODB_URI and other secrets in .env.local
npm run seed
npm run seed:products
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Stripe shop checkout

Retail products on `/shop` use Stripe Checkout (CAD).

1. Add keys to `.env.local`:
   - `STRIPE_SECRET_KEY` — from [Stripe Dashboard](https://dashboard.stripe.com/apikeys) (use test keys locally)
   - `STRIPE_WEBHOOK_SECRET` — webhook signing secret
   - `NEXT_PUBLIC_SITE_URL` — e.g. `http://localhost:3000` or your production URL
2. Local webhooks (required for order emails + admin Orders):

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

Copy the `whsec_...` value into `STRIPE_WEBHOOK_SECRET`.

3. Production: point a Stripe webhook to `https://your-domain/api/stripe-webhook` for event `checkout.session.completed`.

Checkout flow: cart / Buy Now → `POST /api/create-checkout-session` → Stripe hosted Checkout → `/shop/success` or `/shop/cancel`. Paid sessions are stored as Orders and shown under **Admin → Orders**.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run seed` | Seed core CMS data |
| `npm run seed:products` | Seed shop products |
| `npm run seed:pricing` | Seed treatment pricing |
| `npm run seed:services` | Seed services |
| `npm run seed:pages` | Seed page content |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
