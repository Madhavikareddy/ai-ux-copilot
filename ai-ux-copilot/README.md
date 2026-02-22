# AI UX Co-Pilot

> AI-powered UX co-pilot that generates landing page + onboarding + dashboard UX blueprints for SaaS products.

**Mock AI mode enabled** (no OpenAI key required) — this project currently returns a structured mock UX blueprint so the UI/UX can be developed and reviewed end-to-end. Real OpenAI integration can be re-enabled later.

## Screenshots

Add screenshots in `./screenshots/` and reference them here:

- **Landing**: `screenshots/landing.png`
- **Dashboard form**: `screenshots/dashboard.png`
- **Report view**: `screenshots/report.png`

## Product Thinking

**Problem:** SaaS founders spend weeks designing landing pages and onboarding flows through trial and error, often shipping suboptimal UX that hurts conversion.

**Solution:** AI UX Co-Pilot analyzes your product context (audience, industry, pricing, tone) and generates a complete, actionable UX blueprint in seconds — not weeks.

**Target User:** Early-stage SaaS founders who need professional UX guidance but can't afford a UX agency.

## AI Workflow

```
User Input → API Route → Mock UX Blueprint (temporary) → Editable UI
```

1. User fills in product details (name, problem, audience, industry, pricing, tone)
2. The app calls `POST /api/generate`
3. The API returns a structured mock UX blueprint (same shape as the real AI response will use)
4. The UI renders the report with editable blocks and export

When real AI is re-enabled, this flow will become:

`User Input → Structured Prompt → OpenAI (JSON) → Validation → Editable UI`

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client (Browser)                  │
│  Landing Page → Auth → Dashboard → Generate → Report │
└──────────────────────┬──────────────────────────────┘
                       │ API Routes
┌──────────────────────▼──────────────────────────────┐
│                  Next.js Server                      │
│  Auth (JWT/jose) │ AI Service │ Rate Limiter (5/hr)  │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│         OpenAI API (GPT-4o, JSON mode)               │
└─────────────────────────────────────────────────────┘
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Variables
- **Animations:** Framer Motion
- **AI:** Mock mode enabled (temporary) — structured UX blueprint JSON
- **Auth:** JWT via jose + bcryptjs
- **Validation:** Zod
- **Icons:** Lucide React
- **Theme:** next-themes (dark/light toggle)

## Getting Started

### Prerequisites

- Node.js 18+

This repo is currently configured to run in **Mock AI mode**, so no OpenAI API key is required.

### Installation

```bash
cd ai-ux-copilot
npm install
```

### Configuration

Create `.env.local` in the project root:

```env
JWT_SECRET=your_random_secret_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

If you later re-enable real OpenAI integration, you will also need:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
ai-ux-copilot/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── layout.tsx          # Root layout + providers
│   ├── (auth)/             # Login & signup pages
│   ├── (dashboard)/        # Dashboard, reports, settings
│   └── api/                # API routes (auth, generate)
├── components/
│   ├── ui/                 # Primitive components (button, card, input...)
│   ├── landing/            # Landing page sections
│   ├── dashboard/          # Sidebar, analysis form
│   └── report/             # Report view with editable blocks
├── lib/                    # Auth, OpenAI client, utilities
├── services/               # AI service + prompt templates
├── types/                  # TypeScript type definitions
└── middleware.ts            # Auth route protection
```

## AI Output Structure

The AI generates a structured JSON blueprint containing:

| Section | Description |
|---------|-------------|
| Landing Page Sections | 6-8 sections with purpose and content |
| Copy Suggestions | Headlines, subheadlines, body text, CTAs |
| CTA Strategy | Primary/secondary CTAs, placement, urgency |
| Onboarding Flow | 5-7 steps with UI element recommendations |
| Dashboard Layout | 6-8 widgets with priority and placement |
| Design System | Colors, fonts, spacing with reasoning |
| Accessibility Notes | 4-6 WCAG-referenced recommendations |

## Future Roadmap

- [ ] Persist reports to database (PostgreSQL/Supabase)
- [ ] Download report as PDF
- [ ] Shareable report links
- [ ] Version history for reports
- [ ] UX scoring system
- [ ] A/B test copy suggestions
- [ ] Collaborative editing
- [ ] Figma/code export

## Monetization Ideas

- **Free tier:** 3 blueprints/month
- **Pro ($29/mo):** Unlimited blueprints, PDF export, version history
- **Team ($79/mo):** Collaboration, shared workspace, priority AI
- **Enterprise:** Custom prompts, SSO, dedicated support

## License

MIT

## Deploy (Vercel)

Recommended deployment is **Vercel** (free tier is enough):

1. Push this repo to GitHub
2. Go to https://vercel.com/new
3. Import the GitHub repo
4. Deploy (no env vars needed for Mock AI mode)
