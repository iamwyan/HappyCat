# Full-Screen Confetti Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand each successful cat-refresh celebration into a dense, large confetti burst covering the viewport.

**Architecture:** Extend the existing tested `shootConfetti` function from 22 radial pieces to 100 viewport-targeted pieces. Each piece receives a distributed horizontal destination, randomized vertical lift and fall, scale, rotation, and delay; CSS animates those values with GPU-friendly transforms.

**Tech Stack:** Browser JavaScript modules, CSS animations, Node.js built-in test runner

## Global Constraints

- Use roughly 100 large pieces with full-screen horizontal and vertical coverage.
- Preserve dependency-free rendering, timed cleanup, click-through behavior, and reduced-motion suppression.
- Keep the running server on port `4173`.

---

### Task 1: Dense viewport burst

**Files:**
- Modify: `Happy Cat/tests/happy-cat.test.mjs`
- Modify: `Happy Cat/app.mjs`
- Modify: `Happy Cat/styles.css`

**Interfaces:**
- Consumes and preserves: `shootConfetti(button, options): HTMLElement | null`.

- [ ] Change the behavior test to require 100 pieces and verify the first and final pieces receive destinations spanning most of an injected `1000 × 800` viewport.
- [ ] Run `node --test tests/happy-cat.test.mjs` and confirm the existing 22-piece implementation fails the new density assertion.
- [ ] Inject viewport dimensions through `options.innerWidth` and `options.innerHeight`, distribute destinations across the viewport, and add per-piece scale plus longer staggered timing.
- [ ] Increase CSS piece dimensions and animate the new viewport destinations through an upward burst followed by a screen-height fall.
- [ ] Run `npm test` and confirm all behavior and presentation tests pass.
- [ ] Verify the live server returns the updated JavaScript and CSS from `http://localhost:4173`.
