# Wedding Memories — Đức Anh & Nhật Uyên

The existing GSAP / ScrollTrigger invitation and album engine remain in place.
The groom's site uses its original 5 frame images, 30 album images, AU artwork,
date, and venue. This revision does not change the bride's site.

## Scene and camera

`dist/memories.js` builds a 1440 × 1000 world inside `.wedding-camera` /
`.wedding-scene`. The shallow tabletop spans x=240…1200, y=460…585.
Three small rear frames stand at y=495; two front frames overlap at y≈536.
Together they occupy the left 42% of the surface. The closed album sits near
center with a slight −4° rotation and perspective. The closed money box rests
on the right; the paper card has its own footprint next to it. Contact shadows,
flower crops, and pearl strands connect objects to the support plane.

`getFocusTransform()` converts measured client bounds back to world coordinates.
The camera pans/scales the entire scene. Geometry is evaluated again on
ScrollTrigger refresh; artwork is decoded before the initial refresh.

## Named phases

`intro` → `photo-0…4` → `album-focus` → `album-open` → `spread-*` →
`album-close` → `box-focus` → `card-lift` → `wishes` → `card-insert` →
`card-inserted` → `exit`.

The album retains its cover, page system, 10 desktop / 15 mobile spreads and
fullscreen image viewer. Caption and accessibility state follow the active phase.
Mobile shortens travel and reading distances; tablet shortens the pinned scene.
Reduced motion exposes all 35 images and the form without pinning. The no-JS
fallback exposes all 35 captioned images as links to their full-size files.

## The physical wish card

- `dist/memories-wish-scene.js` owns paper geometry and lift/insertion motion.
  It projects the card's tabletop anchor into a screen-space layer, so the same
  DOM paper can travel to a readable foreground position. No replacement modal
  is created, and the box never opens.
- `liftWishCard()` brings the paper forward. `activateWishForm()` enables fields
  only during the reading segment. Keyboard/pointer focus pauses scroll and
  freezes the paper dimensions; inputs keep normal text selection and scrolling.
- `calculateSlotTarget()` reads the real slot anchor with
  `getBoundingClientRect()`. `insertCardIntoSlot()` flies to that measured opening,
  aligns the lower edge, then clips the paper below the fixed slot line while
  feeding it into the box. Opacity decreases only after 94% has entered.
- `playSubmittedConfirmation()` is a one-time 1 → 1.01 → 1 box confirmation,
  gated by successful submission. `exitMoneyBoxScene()` restores the overview.
- `dist/memories-interactions.js` owns validation, input/resize locks, in-memory
  drafts, success/error presentation, and the existing fullscreen image viewer.
  Skipping and reverse-scrolling never invoke the submission callback.
- The host callback's returned message is displayed on the same paper. The
  camera stays still for the acknowledgement, then scrolls into the insertion
  phase. Failed requests retain the draft and allow retry. Pending requests
  suppress duplicate submits. All listeners, timers and tweens are cleaned up.

## Connect Google Sheets

1. Open the destination spreadsheet and its **Extensions → Apps Script** editor.
2. Copy `apps-script/loi-chuc.gs` into that bound project. The reference `.gs` file
   lives in the repository only; it is not loaded by the frontend.
3. Deploy the project as a web app with permission for wedding guests to submit.
4. In `dist/index.html`, replace **`APPS_SCRIPT_URL`** in the inline
   `window.onWeddingWishSubmit` callback immediately before
   `memories-interactions.js` with the deployed HTTPS `/exec` URL.

The placeholder is intentionally left unconfigured. The callback guards against
accidentally posting to a relative placeholder URL. Only an explicit valid form
submission calls it. Payload: `name`, `message` (maximum 1000 characters), and
`anonymous`; the script appends a server timestamp in the first sheet.

The requested `mode: 'no-cors'` transport returns an opaque response: frontend
code cannot verify that Google actually appended a row. After configuring the
URL, make one submission and check the destination sheet. Local QA mocks the
callback and does not claim an end-to-end Google Sheets delivery.

## Ceremony and reception configuration

Edit `dist/wedding-config.js`:

- `ceremony: '09:00'` — **[ĐIỀN GIỜ LỄ]**
- `reception: '11:00'` — **[ĐIỀN GIỜ ĐÓN KHÁCH]**

Use 24-hour `HH:mm`. `countdown.js` derives the target from ceremony time,
`2026-10-25`, and `+07:00`. Section 04, its timeline, the countdown note, and meta
description use these configured values. Also update the static values in
`index.html` when changing them, so no-JS content and initial metadata agree.

## Files and original artwork

`memories-data.js` contains captions, alt text, IDs, source URLs and site identity.
`memories.css` styles the scene; `memories-interactions.css` styles paper/viewer;
`memories-album.js` / `.css` keep the established page engine.

The supplied WebP assets are unchanged: `table.webp`, `frame.webp`,
`album-au.webp`, and `money-box-au.webp`. Flower contact layers reuse cropped
views of the table artwork; no additional photo download is required.

## Validation (2026-10-05)

Chromium checks passed on desktop 1440 × 1000, tablet 820 × 1180, phone
390 × 844, plus slot geometry checks at width 320. Frame/album viewer closing
restored scroll position. Skip issued zero requests; a mocked successful callback
was called once and completed insertion. Placeholder failure retained the draft.
Typing held the timeline and survived a mobile height resize plus refresh.
The real callback's POST body and content type were checked with an intercepted
request; no real Google Sheet was contacted. The clipped paper edge aligned
with the slot within 1px after all four tested width changes. Reduced motion
and no-JS paths each retained 35 images. There is exactly one H1 and no old
09:30 / 10:30 time in published content or countdown code.
