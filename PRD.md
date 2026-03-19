# Feature Prioritization Tool — Product Requirements Document

## 1. Purpose & Vision

A visual prioritization tool that helps PMs score, rank, and communicate feature priorities using proven frameworks (RICE, ICE, Value vs. Effort). Designed for individual PMs who need a fast, shareable way to make and defend prioritization decisions.

## 2. Problem Statement

PMs constantly face the question: "Why are we building X instead of Y?" Most teams rely on spreadsheets or gut instinct. Spreadsheets lack visualization, are hard to share, and don't enforce consistent scoring. This leads to:
- Inconsistent prioritization across features
- Difficulty communicating trade-offs to stakeholders
- Time wasted rebuilding priority matrices every quarter

## 3. User Segments

### Primary: Individual Contributors (IC PMs)
- Mid-level PMs at B2B SaaS companies (2-8 years experience)
- Managing 10-30 feature requests per quarter
- Need to present prioritization rationale to leadership
- Currently using spreadsheets or Notion tables

### Secondary: PM Leaders
- Directors/VPs reviewing team prioritization proposals
- Want a quick visual summary, not a deep-dive tool
- Value consistency across teams

## 4. User Stories

| # | As a... | I want to... | So that... |
|---|---------|-------------|------------|
| 1 | PM | input features with scores across multiple dimensions | I can evaluate them systematically |
| 2 | PM | see a visual matrix of priority vs. effort | I can quickly spot high-impact, low-effort wins |
| 3 | PM | switch between RICE, ICE, and custom frameworks | I can use whichever framework my team prefers |
| 4 | PM | export or share my prioritization | I can present it in planning meetings |
| 5 | PM | save and revisit prioritizations | I can update scores as new data comes in |

## 5. Prioritization Frameworks

### RICE Score
- **Reach**: How many users will this impact per quarter? (numeric)
- **Impact**: How much will this impact each user? (0.25 = minimal, 0.5 = low, 1 = medium, 2 = high, 3 = massive)
- **Confidence**: How confident are you in your estimates? (percentage: 50-100%)
- **Effort**: How many person-months will this take? (numeric)
- **Formula**: (Reach x Impact x Confidence) / Effort

### ICE Score
- **Impact**: 1-10 scale
- **Confidence**: 1-10 scale
- **Ease**: 1-10 scale (inverse of effort)
- **Formula**: Impact x Confidence x Ease

### Value vs. Effort (2x2 Matrix)
- **Value**: 1-10 scale (combines reach + impact)
- **Effort**: 1-10 scale
- **Quadrants**: Quick Wins, Big Bets, Fill-Ins, Money Pit

## 6. Feature Requirements (v1)

### Must Have
- [ ] Add/edit/delete features with name, description, and framework scores
- [ ] RICE score calculator with auto-computed priority score
- [ ] Visual 2x2 matrix (scatter plot) with features plotted by value vs. effort
- [ ] Ranked list view sorted by priority score
- [ ] Persist data to localStorage
- [ ] Dark theme consistent with meeting-summarizer aesthetic

### Should Have
- [ ] Toggle between RICE and ICE frameworks
- [ ] Copy prioritization as formatted markdown
- [ ] Color-code features by category/theme
- [ ] Hover/click on matrix dots to see feature details

### Could Have
- [ ] AI-generated prioritization suggestions based on feature descriptions
- [ ] Import features from a pasted list (CSV or plain text)
- [ ] Export as PNG image for slide decks

### Won't Have (v1)
- Multi-user collaboration (single-user tool)
- Backend/database (localStorage only)
- Integration with Jira/Linear/Asana
- Historical tracking of score changes over time

## 7. Information Architecture

```
┌─────────────────────────────────────────────┐
│  Header: "Feature Prioritizer" + framework  │
│  selector (RICE / ICE / Value vs Effort)    │
├──────────────────────┬──────────────────────┤
│                      │                      │
│   Feature Input      │   Visualization      │
│   & Scored List      │   (2x2 Matrix)       │
│                      │                      │
│   - Add feature      │   Scatter plot with   │
│   - Score sliders    │   quadrant labels    │
│   - Ranked table     │   - Quick Wins (↑←)  │
│   - Delete/edit      │   - Big Bets (↑→)    │
│                      │   - Fill-Ins (↓←)    │
│                      │   - Money Pit (↓→)   │
│                      │                      │
├──────────────────────┴──────────────────────┤
│  Footer: copy markdown · clear all          │
└─────────────────────────────────────────────┘
```

## 8. Technical Approach

- **React 18** with Vite (same stack as meeting-summarizer)
- **Recharts** for the scatter plot / matrix visualization
- **Inline CSS** with dark theme
- **localStorage** for persistence
- **No backend** — fully client-side

## 9. Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Feature count per session | 5+ features scored | localStorage data |
| Framework adoption | Users try 2+ frameworks | Track framework switches |
| Export usage | 30% of sessions use copy/export | Event tracking |
| Return usage | Users revisit saved prioritizations | localStorage presence on load |

## 10. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Scatter plot readability with many features | Users can't distinguish overlapping dots | Limit to 20 features; add hover tooltips |
| Users unfamiliar with RICE/ICE | Low adoption, confusion | Add inline tooltips explaining each dimension |
| localStorage limits (~5MB) | Data loss at scale | Unlikely with text-only data; add export as backup |

## 11. v1 Constraints

- Single-page app, no routing
- No authentication or user accounts
- No mobile optimization (desktop-first)
- Portfolio project — prioritize visual polish over edge cases
