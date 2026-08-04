# Happy Cat Confetti Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Shoot pastel confetti from the button after each successful user-requested cat refresh.

**Architecture:** A focused exported function creates a fixed confetti layer and individual CSS-driven pieces using injected DOM and timing dependencies for direct testing. The existing image success handler invokes it only for button-triggered refreshes, while CSS handles trajectories and reduced-motion safety.

**Tech Stack:** Browser JavaScript modules, CSS animations, Node.js built-in test runner

## Global Constraints

- Use no canvas and no dependencies.
- Trigger only after a successful button-requested refresh, not initial load or errors.
- Remove all confetti pieces after animation.
- Never block pointer input and disable confetti when reduced motion is preferred.

---

### Task 1: Confetti behavior and presentation

**Files:**
- Modify: `Happy Cat/tests/happy-cat.test.mjs`
- Modify: `Happy Cat/tests/static.test.mjs`
- Modify: `Happy Cat/app.mjs`
- Modify: `Happy Cat/styles.css`

**Interfaces:**
- Produces: `shootConfetti(button, options): HTMLElement | null`, where `options` may inject `document`, `matchMedia`, `random`, and `setTimeout`.

- [ ] Add behavior tests proving `shootConfetti` creates pastel pieces around the button, schedules cleanup, and returns `null` when reduced motion is preferred.
- [ ] Run `node --test tests/happy-cat.test.mjs` and confirm failure because `shootConfetti` is not exported.
- [ ] Implement `shootConfetti`, invoke it after successful button-triggered photo loads, and add non-interactive CSS trajectories.
- [ ] Extend static tests to assert the confetti layer, pointer safety, and animation rules exist.
- [ ] Run `npm test` and confirm every existing and new test passes.
- [ ] Request the running page and confirm HTTP `200` after the live module update.
