# FlowEdit Dashboards — Developer Handoff

## Quick Setup

```bash
npm install
npm run dev
```

`.env.local` needs `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

---

## Module Roadmap (from Implementation.txt)

| Module | Description | Status |
|--------|------------|--------|
| Module 1: Database Schema | All Supabase tables, RLS policies, triggers | Done |
| Module 2: Stripe Integration + Subscription Gating | Checkout, webhooks, plan gating | **TODO** |
| Module 3: Project Workflow | Full project lifecycle (create → assign → review → post) | Done |
| Module 3.5: Branding Integration | Client brand kit with file uploads | Done |
| Module 4: Notifications | Event-driven notifications + Supabase Realtime | Done |
| Module 5: Admin Features | Broadcasts, client/contractor management, social tracking | **TODO** |
| Module 6: Contractor Features | Earnings, contracts, resources/onboarding | **TODO** |
| Module 7: Stripe Payouts (Contractor) | Stripe Connect for contractor payouts | **TODO** |

See `Implementation.txt`, `ClientRequirements.txt`, and `DatabaseSchema.txt` in `D:\Projects\FlowEdit\` for full details.

---

## What's Done (Modules 1, 3, 3.5, 4)

### Module 1: Database Schema
- All 11 Supabase tables created with RLS policies and triggers
- Tables in use: `profiles`, `projects`, `project_comments`, `project_versions`, `notifications`, `client_branding`
- Tables created but not connected yet: `social_platforms`, `broadcasts`, `broadcast_recipients`, `contractor_payments`, `contractor_documents`, `onboarding_steps`

### Module 3: Project Workflow
- Full lifecycle working end-to-end with Supabase
- Multi-step project creation modal with file uploads
- Project detail page shared across all 3 roles (different actions per role)
- Comments system, version history with video uploads
- Queries: `src/lib/queries/projects.js`

### Module 3.5: Branding Integration
- Client brand kit: logos, colors, fonts, brand voice (TipTap), graphic assets, guidelines
- File uploads to Supabase Storage
- Queries: `src/lib/queries/branding.js`

### Module 4: Notifications
- Every project status change triggers notifications to the right users
- Supabase Realtime on bell icon (live count) and notification page (live list)
- Mark as read (single + bulk)
- Shared `NotificationPage` component for all 3 roles
- Queries: `src/lib/queries/notifications.js`

### Also Done: Codebase Refactoring
- Merged 3 separate repos into one role-based dashboard
- Standardized folder casing to lowercase
- Consolidated duplicate components (TabNavigation, notification pages)
- Cleaned up dead code and renamed Popup → Modal

---

## What You Need to Build (Modules 2, 5, 6, 7)

### Module 2: Stripe Integration + Subscription Gating

The `profiles` table already has these columns ready:

```
subscription_status   — none / active / canceled / past_due (default: 'none')
subscription_plan     — launch / starter / pro / agency
stripe_customer_id    — Stripe customer ID
```

**What to do:**
1. Install `stripe` and `@stripe/stripe-js`, create Stripe client in `src/lib/stripe/`
2. Create 3 subscription products/prices in Stripe Dashboard (Starter, Pro, Agency)
3. Build checkout flow — client picks a plan → server creates Stripe Checkout Session → redirect to Stripe → on success come back to `/dashboard/client/service`. The marketing site (`Flowedit-Site/`) pricing page should also point to this
4. Build webhook at `src/app/api/webhooks/stripe/route.js` — listen for `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed` and sync status to `profiles`
5. Plan gating — the RLS policy on `projects` already blocks inserts if subscription isn't active. On the frontend, `canSubmitProject` in `src/app/dashboard/client/page.jsx` (line 139) is hardcoded `true` — change it to check the actual subscription status
6. Wire up `src/app/dashboard/client/service/page.jsx` — has 3 tabs (Overview, Invoices, Payment) but content components are empty shells. Replace mock invoice data from `src/data/invoices.js` with Stripe API

### Module 5: Admin Features

These pages have UI built but use mock data from `src/data/`. The DB tables and RLS policies already exist.

- **Broadcasts** (`src/app/dashboard/admin/broadcasts/page.jsx`) — mock data from `src/data/broadcastpage.js`, needs to connect to `broadcasts` + `broadcast_recipients` tables
- **Client management** (`src/app/dashboard/admin/clients/page.jsx`) — mock data from `src/data/clientpage.js`, needs to query `profiles` where role=client, show subscription info, project counts
- **Contractor management** (`src/app/dashboard/admin/contractors/page.jsx`) — mock data from `src/data/contractorpage.js`, needs to query `profiles` where role=contractor, show assignment history
- **Social platform tracking** (`src/app/dashboard/client/social/page.jsx`) — static data from `src/data/social.js`, needs to connect to `social_platforms` table (manual tracking only, no OAuth in v1)

### Module 6: Contractor Features

Same situation — UI exists, mock data, DB tables ready.

- **Earnings** (`src/app/dashboard/contractor/earnings/page.jsx`) — has 2 tabs (Payouts, Wallet) but empty shells, needs to connect to `contractor_payments` table
- **Contracts** (`src/app/dashboard/contractor/contracts/page.jsx`) — static placeholder text, needs to connect to `contractor_documents` table (type=contract)
- **Resources/Onboarding** (`src/app/dashboard/contractor/resources/page.jsx`) — mock data from `src/data/resource.js`, needs to connect to `onboarding_steps` + `contractor_documents` tables

### Module 7: Stripe Payouts (Contractor)

The `profiles` table has a `stripe_connect_id` column and there's a `contractor_payments` table ready.

- Contractor links their Stripe Connect account during onboarding → save `stripe_connect_id`
- Admin creates payment records, process via Stripe Connect transfers
- Show payout history on the earnings page (from Module 6)

---

### Also Remaining: Profile Pages

All 3 profile pages (`client/profile`, `admin/profile`, `contractor/profile`) have form UI but submit handlers just call `alert()`. Need to connect to `profiles` table + `supabase.auth.updateUser()` for password changes.

---

## Conventions

- Queries go in `src/lib/queries/` — no Supabase calls directly in components
- Component folders are **lowercase** (`dashboard/`, not `Dashboard/`)
- Modals use `*Modal` suffix (not Popup)
- Use `notifyProjectEvent()` for project events, `createNotification()` for other events (billing, broadcasts)
- Mock data in `src/data/` — replace with real queries as pages get connected
