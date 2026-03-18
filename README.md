# FlowEdit Dashboards — Developer Handoff

## Quick Setup

```bash
npm install
npm run dev
```

`.env.local` needs `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

---

## What's Been Built

### Module 1: Authentication
- Google OAuth with Supabase (PKCE flow)
- Role-based redirect after login — reads `profiles.role` and sends to `/dashboard/client`, `/admin`, or `/contractor`
- Middleware protects all `/dashboard/*` routes
- Files: `src/middleware.js`, `src/app/auth/callback/route.js`, `src/app/login/page.jsx`, `src/lib/supabase/client.js`, `src/lib/supabase/server.js`

### Module 2: Project Workflow (Core Feature)
Full project lifecycle is working end-to-end with Supabase:

```
Client creates project → Admin assigns contractor → Contractor uploads video version
→ Client reviews (approve or request revision) → Admin marks ready to post → Admin marks posted
```

- Multi-step project creation modal with file uploads to Supabase Storage
- Project detail page shared across all 3 roles (different actions per role)
- Comments system with real-time data
- Version history with video file uploads
- All queries: `src/lib/queries/projects.js`
- UI: `src/components/projects/ProjectSection.jsx` (main project detail page)

### Module 3: Client Branding
- Full brand kit management: logos, colors, fonts, brand voice (TipTap rich text), graphic assets, guidelines
- File uploads to Supabase Storage
- Queries: `src/lib/queries/branding.js`
- Page: `src/app/dashboard/client/branding/page.jsx`

### Module 4: Notifications
- Event-driven — every project status change triggers notifications to the right people:
  - Project created → admins
  - Contractor assigned → client
  - Assigned to you → contractor
  - Submitted for review → client
  - Revision requested → contractor
  - Project approved → contractor + admins
  - Ready to post → admins
  - Posted → client + contractor
  - New comment → other participants
- **Supabase Realtime** on the bell icon (live unread count) and on the notification page (live list)
- Mark as read (single click + mark all)
- One shared `NotificationPage` component used by all 3 roles
- Queries: `src/lib/queries/notifications.js`
- Realtime subscription: `src/app/dashboard/layout.jsx` (lines 84–101)
- Shared page: `src/components/notification/NotificationPage.jsx`

> **RLS note**: The INSERT policy on `notifications` uses `WITH CHECK (true)` so any user can create notifications for other users. The `createBulkNotifications` function does NOT call `.select()` after `.insert()` — this is intentional to avoid triggering the SELECT policy on cross-user rows.

> **Realtime**: The `notifications` table has Realtime enabled in Supabase Dashboard → Database → Replication.

### Codebase Refactoring
- Merged 3 separate repos (client, admin, contractor) into one role-based dashboard
- Standardized folder casing to lowercase (`components/dashboard/`, `settings/`, `social/`)
- Moved mock data from `src/utils/` → `src/data/`
- Consolidated 3 duplicate `TabNavigation` components into one shared `src/components/common/TabNavigation.jsx`
- Consolidated 3 duplicate notification pages into one shared component
- Renamed `Popup` → `Modal` across components (`ProjectApproveModal`, `ProjectSuccessModal`)
- Removed dead code (`ProjectPopUp/` directory, empty test files)

---

## What's Left (for you)

### Module 5: Stripe Payments & Subscriptions (NOT STARTED)
**This is the main thing you need to build.** No Stripe dependency exists in the project yet.

**What needs to happen:**
- Stripe subscription checkout (3 plans: Starter, Pro, Elite)
- Stripe webhook to sync subscription status to Supabase
- Gate project creation behind active subscription — `canSubmitProject` in `src/app/dashboard/client/page.jsx` (line 139) is hardcoded `true` right now
- Invoice history — currently mock data in `src/data/invoices.js`
- Contractor earnings/payouts tracking

**Pages that are waiting for Stripe:**
- `src/app/dashboard/client/service/page.jsx` — has 3 tabs (Overview, Invoices, Payment) but components are shells
- `src/app/dashboard/contractor/earnings/page.jsx` — has 2 tabs (Payouts, Wallet) but components are shells

**Suggested file structure:**
- `src/lib/stripe/` — Stripe helpers
- `src/app/api/webhooks/stripe/route.js` — Webhook endpoint
- Store subscription status in Supabase `profiles` table or a new `subscriptions` table

### Other Pages Still on Mock Data
These pages have UI built but use static/mock data from `src/data/`. They need Supabase queries:

| Page | File | Mock Data Source |
|------|------|-----------------|
| Admin → Clients list | `src/app/dashboard/admin/clients/page.jsx` | `src/data/clientpage.js` |
| Admin → Contractors list | `src/app/dashboard/admin/contractors/page.jsx` | `src/data/contractorpage.js` |
| Admin → Broadcasts | `src/app/dashboard/admin/broadcasts/page.jsx` | `src/data/broadcastpage.js` |
| Contractor → Resources | `src/app/dashboard/contractor/resources/page.jsx` | `src/data/resource.js` |
| Contractor → Contracts | `src/app/dashboard/contractor/contracts/page.jsx` | Static text |

### Profile Pages (UI done, no save)
All 3 profile pages (`client/profile`, `admin/profile`, `contractor/profile`) have the form UI but submit handlers just call `alert()`. Need to connect to Supabase `profiles` table + `supabase.auth.updateUser()` for password changes.

### Social Page (intentionally deferred)
`src/app/dashboard/client/social/page.jsx` — v1 is manual posting only, no OAuth. This is by design.

---

## Supabase Tables

| Table           | Purpose                                    |
| --------------- | ------------------------------------------ |
| `profiles`      | User info, role, avatar_url                |
| `projects`      | Project CRUD + status workflow             |
| `comments`      | Project comments (joined with profiles)    |
| `versions`      | Video version uploads per project          |
| `notifications` | Notification system (Realtime enabled)     |
| `branding`      | Client brand kits + file references        |

---

## Conventions to Follow

- All queries go in `src/lib/queries/` — don't put Supabase calls directly in components
- Component folders are **lowercase** (`dashboard/`, not `Dashboard/`)
- Modal components use `*Modal` suffix (not Popup)
- Use `notifyProjectEvent()` from `src/lib/queries/notifications.js` for any new project events
- Mock data lives in `src/data/` — replace with real queries as you build out each page
