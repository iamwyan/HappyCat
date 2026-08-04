# Happy Cat Design

## Goal

Create a cheerful single-page website that shows a random real cat photo and a motivational quote in Spanish. Each button click refreshes both pieces of content.

## Experience

- Use a playful pastel visual style with rounded shapes, friendly typography, soft shadows, and light decorative motion.
- Center the experience in a responsive card that works on phones and desktop screens.
- Show one large cat photo, one Spanish motivational quote, and one prominent `¡Otro gatito!` button.
- Load an initial cat and quote when the page opens.
- On each successful button-triggered refresh, shoot roughly 100 large pastel confetti pieces outward from the button across the full viewport.

## Architecture

- Build a dependency-free static site with focused HTML, CSS, and JavaScript files.
- Fetch random real cat photos from the keyless CATAAS `/cat` endpoint.
- Add a unique query value to each image request to prevent browser caching.
- Keep a curated local array of Spanish motivational quotes and select a different quote when practical.
- Create confetti with lightweight local JavaScript and CSS, without canvas or dependencies; vary piece size, shape, travel, and delay, then remove all pieces after the animation.
- Serve the site locally on port `4173`, not port `3000`.

## States and Errors

- Disable the button and show a loading treatment while a new photo loads.
- Swap the photo and quote only after the image loads successfully, avoiding broken-image flashes.
- If loading fails, retain the current content and show a friendly Spanish retry message.
- Respect reduced-motion preferences.
- Do not create confetti when reduced motion is preferred, and ensure confetti never blocks pointer input.

## Verification

- Verify the page loads at `http://localhost:4173`.
- Verify repeated clicks request fresh image URLs and rotate Spanish quotes.
- Verify loading, failure, responsive layout, keyboard focus, and reduced-motion behavior.
- Verify confetti is triggered after a successful button click and cleans itself up.

## Out of Scope

- User accounts, saved favorites, uploads, analytics, and a custom backend.
- API keys or setup steps for the user.
