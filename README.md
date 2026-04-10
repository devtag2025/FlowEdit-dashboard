# FlowEdit Dashboards — Developer Handoff

## Quick Setup

```bash
npm install
npm run dev
```
---

## Module Roadmap

| Module | Description | Status |
|--------|------------|--------|
| Module 1: Database Schema | All Supabase tables, RLS policies, triggers | **Done** |
| Module 2: Stripe Integration + Plan Gating | Checkout, webhooks, subscription sync | **Done** |
| Module 3: Project Workflow (base) | Full lifecycle create → assign → review → post | **Done** |
| Module 3A: Revision Status + 3 Editor Roles | `revision` state + Offline / Primary / Finishing Editor | **TODO** (new from PPT) |
| Module 3.5: Branding Integration | Client brand kit with file uploads | **Done** |
| Module 4: Notifications | Event-driven notifications + Supabase Realtime | **Done** |
| Module 5: Admin Features | Broadcasts, client/contractor management, socials | **Mostly Done** |
| Module 6: Contractor Features | Earnings, contracts, resources/onboarding | **Partially Done** |
| Module 7: Stripe Payouts (Contractor) | Stripe Connect + admin-triggered transfers | **Done** |
| Module 8: Video Upload + Timeline Comments | Direct video upload + timecode-synced comments | **TODO** (new from PPT) |

See `D:\Projects\FlowEdit\Implementation.md` for the full breakdown.

---

## What's Done

- **Auth** — Google OAuth via Supabase (PKCE), role-based routing (client/admin/contractor)
- **Project workflow** — client submits → admin assigns → contractor uploads versions → client approves or requests revision → admin marks posted
- **Comments + version history** — real-time, with approve/reject per version
- **Branding** — logos, colors, fonts, brand voice, graphic assets, guidelines (Supabase Storage)
- **Notifications** — 9 event types, live unread count + inbox via Supabase Realtime
- **Stripe Checkout + webhooks + plan gating** — subscription sync handles the case where user pays before logging in (falls through `pending_subscriptions` table)
- **Stripe Connect payouts** — contractor onboarding flow + admin "Pay Contractor" modal wired to Stripe Transfer API
- **Admin features** — broadcasts (with audience targeting), client list + detail, contractor list + detail
- **Social platform tracking** — manual connect/disconnect (no OAuth in v1)

---

## What's Left

### Module 3A — Revision Status + Three Editor Roles *(new from Client)*

The updated project flow from the client's PPT:

```
SUBMITTED → IN_PROGRESS → REVIEW → REVISION (loop) → COMPLETED → READY_TO_POST → POSTED
```

Two things need to change:

1. **Add `revision` status** to the project lifecycle. Currently "Request Revision" sends the project back to `in_progress` — it should go to a formal `revision` state that loops back to `review`.

2. **Three editor roles per project** — instead of a single `contractor_id`, each project has an Offline Editor, Primary Editor, and Finishing Editor. This needs a new `project_assignments` table:

   ```
   project_assignments
     project_id, contractor_id, role ('offline_editor' | 'primary_editor' | 'finishing_editor')
     UNIQUE(project_id, role)
   ```

   The `AssignContractorModal` needs to be reworked to assign 3 roles. Contractor dashboard needs to query through `project_assignments` instead of `projects.contractor_id`. RLS on `projects` and `project_versions` needs updating too.

### Module 8 — Video Upload + Timeline Comments *(new from Client)*

The client wants the project card to be the review workspace — embedded video player + comments pinned to video timecodes.

**Approach:** instead of pasting external URLs (Google Drive / Frame.io — hard to embed), contractors upload video files directly to a Supabase Storage bucket (`project-videos`). On Pro plan this supports 5GB per file, so no size concerns.

**What to build:**

1. **Video upload** — replace the URL input in `UploadVersionModal` with a file picker. Upload to Supabase Storage, save the resulting URL in `project_versions.video_url`.
2. **Embedded video player** — new `VideoPlayer.jsx` component using HTML5 `<video>`, exposes `currentTime` and `seekTo()` via ref. Replace the play-button-link in `ProjectSection.jsx`.
3. **Timecode comments** — add `timecode` (numeric, nullable) column to `project_comments`. Add a "Pin to current time" button next to the comment input. Display `[MM:SS]` badges on timed comments. Clicking the badge seeks the video.

### Module 5 — Remaining Admin Work

- **Admin as Reviewer** — admin needs explicit "review and send to revision" / "approve" actions on projects in `review` state (ties into Module 3A)
- **`ContractorDetail.jsx`** — onboarding progress is hardcoded in the component, should fetch from `onboarding_steps` table
- **Admin view of client socials** — client-side social page works, but admin can't see which client has what connected

### Module 6 — Remaining Contractor Work

Two pages still use static data and need DB wiring:

- **Contracts page** (`/dashboard/contractor/contracts`) — currently just hardcoded text. Needs to fetch from `contractor_documents` table + add a "Sign" action that updates `status = 'signed'`
- **Resources page** (`/dashboard/contractor/resources`) — all three tabs pull from static `/data/*` files:
  - `OnboardingSteps` → should fetch from `onboarding_steps` table
  - `LearningCatalog` → needs a real table or external content source
  - `Policies` → should fetch from `contractor_documents` where `type = 'policy'`

---

## Known Issues to Clean Up

- `src/lib/queries/clients.js` — the fetch-all-clients function is misnamed `fetchMyPayments` (copy-paste artifact). Should be renamed to `fetchAllClients`.
- `src/lib/queries/projects.js` — `fetchUserProfile()` has a client-side row-delete fallback (lines 380–406) that's risky. The primary path calls `/api/auth/merge-subscription` which is correct; the fallback should be removed or moved entirely to a DB trigger.
- `src/app/api/webhooks/stripe/route.js` — leftover `console.log` debug statements.

---

## Database Changes Needed

For Module 3A:
- Add `'revision'` to `projects.status` allowed values
- Create `project_assignments` table with RLS policies
- Update RLS on `projects` / `project_versions` to resolve contractor access through `project_assignments`

For Module 8:
- Create Supabase Storage bucket `project-videos` (authenticated access)
- Add `timecode` (numeric, nullable) to `project_comments`

---

## Conventions

- Queries live in `src/lib/queries/` — no direct Supabase calls from components
- Component folders use lowercase (`dashboard/`, not `Dashboard/`)
- Modals use the `*Modal` suffix
- Use `notifyProjectEvent()` for project events; `createNotification()` / `createBulkNotifications()` for everything else
- Static mock data in `src/data/` should be replaced with real queries as pages get wired up
