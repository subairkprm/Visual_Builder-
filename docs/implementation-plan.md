# Visual Builder - Comprehensive Implementation Plan

## Executive Summary

**Current Status:** 35-40% complete overall
- Foundation: 80-90% complete (build, test, lint, health endpoint, storage, templates)
- Core Product: 40% complete (intake, visual mapping implemented; output/export missing)
- MVP Usefulness: Partial (needs export layer)
- Production Readiness: Early (no backend, auth, cloud sync)

**Mission:** Complete the Visual Builder MVP to enable non-technical users to translate software ideas into structured project briefs through familiar analogies.

## Implementation Strategy

This plan organizes work into 6 phases with specialized sub-agent teams:

### Phase 1: Baseline Closure & Maintainability (IMMEDIATE)
**Goal:** Stabilize the codebase foundation
**Priority:** HIGH
**Team:** Infrastructure Team
**Estimated Effort:** Small (1-2 days)

#### Tasks
1. **Centralize Analogy Key Validation**
   - Create single source of truth for valid analogy keys
   - Prevent drift between types, templates, and storage
   - Files: `types/project.ts`, `lib/templates.ts`, `lib/storage.ts`
   - Owner: Backend Engineer

2. **Add CI Workflow**
   - Create `.github/workflows/ci.yml`
   - Run typecheck, test, lint, build on all PRs
   - Ensure main branch protection
   - Owner: DevOps Engineer

3. **Add Repository Instructions**
   - Create `.github/copilot-instructions.md`
   - Clarify this is Next.js/TypeScript (not Python/FastAPI)
   - Include architecture overview
   - Owner: Technical Writer

4. **Add Greenhouse Template**
   - Validate mixed stage counts work properly
   - Add to `lib/templates.ts` as 4th analogy option
   - Add tests for 5-stage template
   - Owner: Frontend Engineer

**Acceptance Criteria:**
- All CI checks run automatically on PRs
- No analogy key validation drift possible
- New contributors understand the stack immediately

---

### Phase 2: MVP Output & Export Layer (CRITICAL)
**Goal:** Make the app useful beyond viewing
**Priority:** CRITICAL
**Team:** Product Team (Frontend + Backend)
**Estimated Effort:** Medium (3-5 days)

#### Tasks

##### 2.1 Project Brief Generator
- **File:** `lib/brief-generator.ts`
- **Dependencies:** None
- **Owner:** Backend Engineer

**Implementation:**
```typescript
export interface ProjectBrief {
  metadata: {
    projectName: string;
    objective: string;
    targetUsers: string;
    environment: string;
    generatedAt: string;
  };
  analogyContext: {
    template: string;
    currentStage: string;
    visualDescription: string;
  };
  technicalMapping: {
    stages: StageDefinition[];
    elements: VisualElement[];
    focus: string;
  };
  nextSteps: string[];
  notes: string;
}

export function generateBrief(
  draft: ProjectDraft,
  template: AnalogyTemplate
): ProjectBrief;

export function formatBriefAsMarkdown(brief: ProjectBrief): string;
export function formatBriefAsPlainText(brief: ProjectBrief): string;
```

**Tests Required:**
- Generate brief with all fields populated
- Generate brief with minimal data
- Markdown formatting matches expected structure
- Plain text formatting is readable

##### 2.2 Output Panel Component
- **File:** `components/output-panel.tsx`
- **Dependencies:** `lib/brief-generator.ts`
- **Owner:** Frontend Engineer

**Features:**
- Display generated brief in readable format
- Real-time updates when draft changes
- Preview markdown rendering
- Tabbed view: Preview / Markdown / Plain Text

##### 2.3 Copy to Clipboard
- **File:** `components/output-panel.tsx` (extend)
- **Dependencies:** Browser Clipboard API
- **Owner:** Frontend Engineer

**Implementation:**
- Add copy button for each format
- Show success/error feedback
- Handle clipboard permissions
- Fallback for unsupported browsers

##### 2.4 Download Functionality
- **File:** `lib/export.ts`
- **Dependencies:** None
- **Owner:** Backend Engineer

**Implementation:**
```typescript
export function downloadAsMarkdown(
  brief: ProjectBrief,
  filename?: string
): void;

export function downloadAsPlainText(
  brief: ProjectBrief,
  filename?: string
): void;

export function downloadAsJSON(
  draft: ProjectDraft,
  filename?: string
): void;
```

##### 2.5 Developer Handoff Format
- **File:** `lib/brief-generator.ts` (extend)
- **Owner:** Technical Writer + Backend Engineer

**Implementation:**
- Add developer-specific section to brief
- Include technical requirements checklist
- Add architecture hints based on analogy
- Suggest tech stack based on environment
- Format optimized for AI assistants (Codex, Copilot)

##### 2.6 Integration & Testing
- **Owner:** QA Engineer + Frontend Engineer

**Tasks:**
- Integrate output panel into main dashboard
- Add comprehensive tests for all export formats
- Test edge cases (empty fields, special characters)
- Validate accessibility of new components

**Acceptance Criteria:**
- User can view generated brief in multiple formats
- Copy to clipboard works in all major browsers
- Download generates valid files
- Brief includes all project information
- Developer handoff format is actionable

---

### Phase 3: UX Guidance Layer (IMPORTANT)
**Goal:** Make the tool self-explanatory
**Priority:** HIGH
**Team:** UX Team (Designer + Frontend)
**Estimated Effort:** Medium (3-4 days)

#### Tasks

##### 3.1 Onboarding Flow
- **Files:** `components/onboarding-modal.tsx`, `components/tutorial-overlay.tsx`
- **Owner:** UX Designer + Frontend Engineer

**Features:**
- First-time user welcome modal
- Interactive tutorial highlighting key features
- Step-by-step guide for creating first project
- Skip/dismiss options with localStorage tracking

##### 3.2 Contextual Help System
- **Files:** `components/help-tooltip.tsx`, `lib/help-content.ts`
- **Owner:** Technical Writer + Frontend Engineer

**Features:**
- Tooltip help for each form field
- Expandable help sections per analogy template
- "What is this?" buttons throughout UI
- Help content indexed by topic

##### 3.3 Stage-Specific Guidance
- **Files:** `components/stage-guidance-panel.tsx`, `lib/stage-guidance.ts`
- **Owner:** Product Manager + Frontend Engineer

**Features:**
- Show recommended actions for current stage
- Display success criteria for active stage
- Suggest what to focus on next
- Link visual elements to current stage context

##### 3.4 Template Comparison View
- **File:** `components/template-comparison.tsx`
- **Owner:** UX Designer + Frontend Engineer

**Features:**
- Side-by-side comparison of analogy templates
- Help users choose the right template
- Show example use cases for each
- Visual preview of stage progression

##### 3.5 Progress Indicators
- **Files:** Enhance existing `components/progress-overview.tsx`
- **Owner:** Frontend Engineer

**Features:**
- Add percentage completion to each stage
- Show estimated next steps
- Visual timeline with milestones
- Celebrate stage completions

**Acceptance Criteria:**
- First-time users complete their first project without external help
- Every form field has clear explanatory help
- Users understand their current stage and next steps
- Template selection is confident and informed

---

### Phase 4: AI Assist Layer (ENHANCEMENT)
**Goal:** Automate idea to structure translation
**Priority:** MEDIUM
**Team:** AI Team (ML Engineer + Backend)
**Estimated Effort:** Large (5-7 days)

#### Tasks

##### 4.1 Natural Language Project Parser
- **File:** `lib/ai/project-parser.ts`
- **Dependencies:** OpenAI API or local LLM
- **Owner:** ML Engineer

**Features:**
- Parse free-form project description
- Extract: name, objective, target users, environment
- Suggest best-fit analogy template
- Identify current project stage

##### 4.2 Smart Template Recommendation
- **File:** `lib/ai/template-recommender.ts`
- **Owner:** ML Engineer

**Features:**
- Analyze project characteristics
- Score each template for fit
- Explain recommendation reasoning
- Allow user override with explanation

##### 4.3 Auto-Generated Technical Mapping
- **File:** `lib/ai/technical-mapper.ts`
- **Owner:** ML Engineer + Backend Engineer

**Features:**
- Map user's visual elements to technical terms
- Suggest architecture patterns
- Identify potential dependencies
- Generate initial technical focus areas

##### 4.4 Intelligent Next Steps
- **File:** `lib/ai/next-steps-generator.ts`
- **Owner:** ML Engineer

**Features:**
- Analyze project state and stage
- Generate specific, actionable next steps
- Prioritize recommendations
- Adapt to user's technical level

##### 4.5 Brief Enhancement
- **Files:** Extend `lib/brief-generator.ts` with AI
- **Owner:** ML Engineer + Backend Engineer

**Features:**
- AI-enhanced project descriptions
- Auto-complete missing sections
- Suggest improvements to clarity
- Generate architecture diagrams (Mermaid/PlantUML)

##### 4.6 API Integration Layer
- **Files:** `app/api/ai/parse/route.ts`, `app/api/ai/recommend/route.ts`
- **Owner:** Backend Engineer

**Implementation:**
- Secure API key management
- Rate limiting and error handling
- Streaming responses for better UX
- Caching to reduce API costs

**Acceptance Criteria:**
- Users can paste raw idea text and get structured project
- Template recommendations are accurate and well-explained
- Technical mapping provides real value
- AI features degrade gracefully if API unavailable

---

### Phase 5: Cloud & Product Layer (PRODUCTION)
**Goal:** Enable persistence, sharing, deployment
**Priority:** MEDIUM
**Team:** Full Stack Team (Backend + DevOps + Frontend)
**Estimated Effort:** Large (7-10 days)

#### Tasks

##### 5.1 Backend Service Setup
- **Stack:** Next.js API Routes + Database (PostgreSQL/Supabase)
- **Files:** `app/api/projects/*`, `lib/db/*`
- **Owner:** Backend Engineer + DevOps

**Features:**
- RESTful API for projects CRUD
- Database schema design
- Connection pooling and optimization
- Migration scripts

##### 5.2 Authentication System
- **Stack:** NextAuth.js or Clerk
- **Files:** `app/api/auth/*`, `lib/auth/*`
- **Owner:** Backend Engineer

**Features:**
- Email/password authentication
- OAuth providers (GitHub, Google)
- Session management
- Protected routes and API endpoints

##### 5.3 Project Persistence
- **Files:** `lib/api-client.ts`, update storage layer
- **Owner:** Full Stack Engineer

**Features:**
- Save projects to cloud
- Load projects from cloud
- Sync localStorage with cloud
- Offline-first with sync
- Conflict resolution

##### 5.4 Sharing & Collaboration
- **Files:** `app/api/share/*`, `components/share-modal.tsx`
- **Owner:** Full Stack Engineer

**Features:**
- Generate shareable links
- Public/private project toggle
- View-only vs edit permissions
- Embed projects in other sites

##### 5.5 Deployment Pipeline
- **Platform:** Vercel or similar
- **Files:** `.github/workflows/deploy.yml`, `vercel.json`
- **Owner:** DevOps Engineer

**Features:**
- Automated deployment on merge to main
- Preview deployments for PRs
- Environment variable management
- Database migrations on deploy
- Rollback capability

##### 5.6 Monitoring & Analytics
- **Tools:** Vercel Analytics, Sentry, PostHog
- **Files:** `lib/analytics.ts`, `lib/monitoring.ts`
- **Owner:** DevOps Engineer

**Features:**
- Error tracking and alerts
- Performance monitoring
- User behavior analytics
- Feature usage metrics
- Custom dashboards

**Acceptance Criteria:**
- Users can save and load projects from any device
- Authentication is secure and user-friendly
- Projects can be shared easily
- Application is deployed and accessible
- Monitoring alerts on critical errors

---

### Phase 6: SaaS Readiness (SCALE)
**Goal:** Multi-tenant, billing, admin, security
**Priority:** LOW (Future)
**Team:** Enterprise Team (All disciplines)
**Estimated Effort:** Very Large (10-15 days)

#### Tasks

##### 6.1 Multi-Project Workspace Model
- **Files:** `types/workspace.ts`, `app/api/workspaces/*`
- **Owner:** Backend Engineer + Product Manager

**Features:**
- Workspace entity (team/organization)
- Multiple projects per workspace
- User roles per workspace
- Workspace settings and preferences

##### 6.2 Team Collaboration
- **Files:** `app/api/teams/*`, `components/team-management.tsx`
- **Owner:** Full Stack Engineer

**Features:**
- Invite team members
- Role-based access control (Owner, Editor, Viewer)
- Activity feed per project
- Comments and discussions
- @mentions and notifications

##### 6.3 Billing & Subscriptions
- **Stack:** Stripe
- **Files:** `app/api/billing/*`, `components/pricing.tsx`
- **Owner:** Backend Engineer + Product Manager

**Features:**
- Subscription tiers (Free, Pro, Team, Enterprise)
- Usage-based billing for AI features
- Payment processing
- Invoice generation
- Subscription management UI

##### 6.4 Admin Dashboard
- **Files:** `app/admin/*`
- **Owner:** Full Stack Engineer

**Features:**
- User management
- Workspace management
- Analytics and reports
- Feature flags
- Support ticket system

##### 6.5 Enterprise Security
- **Owner:** Security Engineer + Backend Engineer

**Features:**
- SOC 2 compliance preparation
- SAML/SSO integration
- Audit logs
- Data encryption at rest and in transit
- GDPR compliance tools
- Rate limiting and DDoS protection

##### 6.6 Advanced Observability
- **Tools:** DataDog or New Relic
- **Owner:** DevOps Engineer

**Features:**
- Distributed tracing
- Custom metrics and alerting
- Log aggregation and search
- Performance profiling
- Cost monitoring

**Acceptance Criteria:**
- Support multiple users per workspace
- Billing system processes payments reliably
- Admin tools enable operational management
- Security audit passes
- System scales to 10k+ users

---

## Team Structure & Responsibilities

### Infrastructure Team (Phase 1)
- **Backend Engineer:** Analogy key validation, templates
- **DevOps Engineer:** CI/CD pipeline setup
- **Technical Writer:** Documentation
- **Frontend Engineer:** Greenhouse template UI

### Product Team (Phase 2)
- **Backend Engineer:** Brief generator, export logic
- **Frontend Engineer:** Output panel, clipboard, UI integration
- **QA Engineer:** Testing all export scenarios
- **Technical Writer:** Developer handoff format

### UX Team (Phase 3)
- **UX Designer:** Onboarding flow, template comparison design
- **Frontend Engineer:** Component implementation
- **Technical Writer:** Help content creation
- **Product Manager:** Stage guidance definition

### AI Team (Phase 4)
- **ML Engineer:** NLP parsing, template recommendation, AI features
- **Backend Engineer:** API integration, caching, optimization
- **Frontend Engineer:** AI-powered UI components

### Full Stack Team (Phase 5)
- **Backend Engineer:** Database, auth, API design
- **Frontend Engineer:** Cloud sync UI, sharing features
- **DevOps Engineer:** Deployment, monitoring, infrastructure
- **Full Stack Engineer:** Project persistence, collaboration features

### Enterprise Team (Phase 6)
- **Backend Engineer:** Multi-tenancy, billing backend
- **Frontend Engineer:** Admin dashboard, team management UI
- **Security Engineer:** Compliance, security hardening
- **DevOps Engineer:** Advanced observability
- **Product Manager:** Pricing, packaging, enterprise features

---

## Risk Management

### Technical Risks
1. **AI API Costs:** Phase 4 could be expensive
   - Mitigation: Implement caching, rate limiting, usage quotas

2. **Database Scaling:** Phase 5+ could face performance issues
   - Mitigation: Proper indexing, connection pooling, caching layer

3. **Real-time Sync Conflicts:** Multiple devices editing same project
   - Mitigation: Last-write-wins initially, CRDT for later

### Product Risks
1. **User Adoption:** Users may not understand analogy concept
   - Mitigation: Strong onboarding (Phase 3) before marketing push

2. **Template Limitations:** Only 3-4 templates may feel restrictive
   - Mitigation: Add custom template builder in Phase 6

### Business Risks
1. **Free Tier Abuse:** AI features could be expensive
   - Mitigation: Usage limits, captcha, authentication required

2. **Competition:** Similar tools may emerge
   - Mitigation: Focus on quality UX and AI differentiation

---

## Success Metrics

### Phase 1 (Baseline)
- ✅ All CI checks pass on every PR
- ✅ Zero type/lint errors in source code
- ✅ Test coverage > 80%

### Phase 2 (MVP Output)
- 📊 Users can export briefs in 3+ formats
- 📊 > 90% of generated briefs are "useful" (user survey)
- 📊 Average time to first export < 5 minutes

### Phase 3 (UX Guidance)
- 📊 > 70% of new users complete their first project
- 📊 Support requests about "how to use" < 5%
- 📊 Template selection confidence > 80%

### Phase 4 (AI Assist)
- 📊 AI-parsed projects require < 20% manual correction
- 📊 Template recommendations accepted > 75% of time
- 📊 User satisfaction with AI features > 4/5

### Phase 5 (Cloud)
- 📊 > 50% of users save projects to cloud
- 📊 API uptime > 99.5%
- 📊 Average page load < 2 seconds

### Phase 6 (SaaS)
- 📊 Support 10k+ registered users
- 📊 Billing system 99.9% accurate
- 📊 Pass security audit

---

## Next Steps (Immediate Actions)

1. **TODAY:** Fix baseline issues (Phase 1)
   - Add CI workflow
   - Centralize validation
   - Add copilot instructions

2. **THIS WEEK:** Start Phase 2 (Output Layer)
   - Implement brief generator
   - Build output panel component
   - Add export functionality

3. **ASSIGN TEAMS:** Identify and assign sub-agents
   - Infrastructure team for Phase 1
   - Product team for Phase 2
   - Plan Phase 3+ sprints

4. **TRACK PROGRESS:** Set up project board
   - Use GitHub Projects or similar
   - Daily standups with sub-agent reports
   - Weekly demos of completed features

---

## Appendix: File Structure (Future State)

```
Visual_Builder-/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # Phase 1
│   │   └── deploy.yml                # Phase 5
│   └── copilot-instructions.md       # Phase 1
├── app/
│   ├── api/
│   │   ├── ai/                       # Phase 4
│   │   ├── auth/                     # Phase 5
│   │   ├── billing/                  # Phase 6
│   │   ├── health/
│   │   ├── projects/                 # Phase 5
│   │   ├── share/                    # Phase 5
│   │   ├── teams/                    # Phase 6
│   │   └── workspaces/               # Phase 6
│   ├── admin/                        # Phase 6
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── help-tooltip.tsx              # Phase 3
│   ├── onboarding-modal.tsx          # Phase 3
│   ├── output-panel.tsx              # Phase 2
│   ├── progress-overview.tsx
│   ├── project-builder-dashboard.tsx
│   ├── share-modal.tsx               # Phase 5
│   ├── stage-guidance-panel.tsx      # Phase 3
│   ├── story-map.tsx
│   ├── technical-mirror.tsx
│   ├── template-card.tsx
│   ├── template-comparison.tsx       # Phase 3
│   └── tutorial-overlay.tsx          # Phase 3
├── lib/
│   ├── ai/                           # Phase 4
│   │   ├── next-steps-generator.ts
│   │   ├── project-parser.ts
│   │   ├── technical-mapper.ts
│   │   └── template-recommender.ts
│   ├── analytics.ts                  # Phase 5
│   ├── api-client.ts                 # Phase 5
│   ├── auth.ts                       # Phase 5
│   ├── brief-generator.ts            # Phase 2
│   ├── db/                           # Phase 5
│   ├── export.ts                     # Phase 2
│   ├── help-content.ts               # Phase 3
│   ├── monitoring.ts                 # Phase 5
│   ├── project-helpers.ts
│   ├── stage-guidance.ts             # Phase 3
│   ├── storage.ts
│   └── templates.ts
├── types/
│   ├── project.ts
│   └── workspace.ts                  # Phase 6
├── tests/
│   ├── brief-generator.test.ts       # Phase 2
│   ├── export.test.ts                # Phase 2
│   ├── health-route.test.ts
│   ├── project-helpers.test.ts
│   └── storage.test.ts
└── docs/
    ├── architecture/
    ├── implementation-plan.md        # This file
    ├── runbooks/
    └── specs/
```

---

## Document Control

- **Version:** 1.0
- **Last Updated:** 2026-04-17
- **Owner:** Lead Agent
- **Status:** Active
- **Next Review:** After Phase 2 completion
