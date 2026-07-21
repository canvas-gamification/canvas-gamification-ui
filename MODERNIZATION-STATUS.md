# Modernization status (branch: modernize-deps)

Goal: upgrade everything to modern versions, keep functionality/UX. No framework swaps.

## Completed (all committed on `modernize-deps`)
- Angular 13 -> 22 (stepwise ng update; note: ng update repeatedly wrote mixed majors into package.json — always verify/pin all @angular/* to same version after each hop)
- Taiga UI 2 -> 3 -> 4 -> 5 (official migrations + manual fixes). Editor now @taiga-ui/editor 5 + tiptap 3.
- RxJS 7.8, TypeScript 6.0 (`strict: false` set explicitly — TS6 flipped default), zone.js 0.16
- CodeMirror 6 (was 0.19); ran `npm dedupe` to fix duplicate @lezer/common ("tags is not iterable" crash)
- ng2-dragula -> Angular CDK drag-drop (parsons-lines + variables-editor rewritten)
- jointjs -> @joint/core 4 + @joint/layout-directed-graph (jquery/backbone removed everywhere)
- Sentry 6 -> 10 (browserTracingIntegration; backend CORS now allows `baggage` header — edited ../canvas-gamification/canvas_gamification/settings.py)
- ng-recaptcha -> ng-recaptcha-2@22
- Tailwind 3 -> 4 (.postcssrc.json + src/tailwind.css with `@import "tailwindcss"`; tailwind.config.js removed)
- ngx-highlightjs removed entirely (was configured but directive never used anywhere)
- eslint 9 flat config (eslint.config.js) + angular-eslint 22 + typescript-eslint 8; prefer-inject/prefer-standalone intentionally off. Lint = 0 errors, some warnings.
- Protractor/codelyzer/ts-node/url-parse removed; e2e target deleted from angular.json
- karma/jasmine bumped (jasmine-core 5, karma-jasmine 5); `zone.js/testing` import fixed in src/test.ts
- New control flow (@if/@for) migrated across templates
- Icon audit: all `@tui.*` names verified against @taiga-ui/icons/src (fixed o-l->list-ordered, chart->chart-bar, attention->circle-alert, eye-open->eye, more-ver->ellipsis-vertical, te-x->sigma)
- prod build passes (~2.96MB initial, pre-existing budget warning), `ng lint` passes

## Verified in browser (playwright scripts in scratchpad)
- Landing page + CodeMirror java highlighting: OK
- Login (username must be an email-format username, e.g. claudetest@example.com / TestPass123!), homepage, problems list, courses, profile form: OK
- Dark mode via tui-root [attr.tuiTheme]="'dark'": OK (screenshot verified)
- CDK drag-drop (2026-07-21, scratchpad drag-test.mjs, screenshots shot5-*): parsons problem view /problems/6 — transfer between Lines/My Solution both directions (transferArrayItem) + reorder within list (moveItemInArray) all OK; variables-editor on /problems/create/MCQ — add int+float variables, drag-reorder by cdkDragHandle grip icon OK (form values move with rows). Zero console errors. Note: Playwright must simulate CDK drags with mouse.down/small move/stepped move/up — HTML5 dragTo does not work.
- Backend: ../canvas-gamification, .venv python 3.9, `manage.py runserver 8000`; test user claudetest@example.com (Teacher role) exists in db.sqlite3

## OPEN ISSUES (in priority order)
1. ~~/problems/create/:type page body is blank~~ **FIXED**: root cause was `[iconEnd]="templateRef"` (ng-template with rotating tui-icon chevron) — Taiga 5 `iconEnd` only accepts a string icon name; tuiGetIconMode crashed on the TemplateRef. Replaced with `[tuiChevron]` directive (same rotate-on-open UX) in variables-editor, problem-set, admin, course-question-snippet. Also moved misplaced `[ngModelOptions]`/`(ngModelChange)` from `<tui-textfield>` to the native input/textarea in the 4 json-editors + katex-tool (fixed NG01352 error and katex live preview not updating). Note: route type is case-sensitive — MCQ page is /problems/create/MCQ (lowercase mcq renders nothing by design). All 3 create pages verified in browser (editors render, typing works, katex preview renders).
2. ~~Unit tests~~ **FIXED 2026-07-21**: full suite green — `Executed 305 of 305 SUCCESS` (two consecutive clean runs), lint 0 errors, build OK. Root causes and fixes:
   - Karma build was broken by `@import 'katex/dist/katex.min.css'` in styles.scss (resolve-url-loader mangled font urls under the webpack karma builder). Removed the import (app build already loads `katex/dist/katex.css` via angular.json) and added katex.css to the test target styles.
   - The "hang" was not one spec: Taiga 5 alerts/dialogs throw "Portals cannot be used without TuiPortals" when opened in TestBed without tui-root; rxjs defers these subscriber throws via setTimeout, so they detonated in `afterAll` and wedged the karma/jasmine adapter → 60s "no message" disconnect. Fixed by stubbing `TuiNotificationService.open`/`TuiDialogService.open` with `of()` in all specs that exercise alert/dialog flows (register, mcq/parsons/java snippets, profile-details, problem-set, reset-password) and flushing mocked `delay(1)` timers inside `fakeAsync` specs.
   - ConceptMap: genuine app bug — @dagrejs/graphlib stringifies node ids while @joint/core 4 `getCell` is type-sensitive; numeric `category.pk` ids broke `DirectedGraph.layout` (plus `!source.id` treats pk 0 as falsy). Cell ids are now strings in concept-map-graph.ts (converted back to number in the click callback).
   - Angular 22 OnPush-by-default semantics: specs mutating fields/@Inputs then calling `detectChanges()` hit NG0100 or stale DOM; fixed with `fixture.componentRef.setInput(...)` or explicit `markForCheck()` (editor, sidebar, practice-problem, concept-map).
   - Stale expectations updated to current app behavior (consent-form navigates to /homepage; goal-create filters top-level categories; katex 0.18 class names `katex-base`/`katex-strut`; color pipe no longer uses removed `tuiStringHashToHsl`); `CourseServiceMock.getCourseLeaderBoard` now returns `LeaderboardResult` shape; missing pipe/module imports added (StringifyTuiDataListPipe, GetKatexHtmlStringPipe, TuiAutoColorPipe/TuiInitialsPipe/TuiAvatar, standalone DatePipe moved to imports); CourseComponent breadcrumbs spec awaits `getBreadCrumbs` directly (fakeAsync(async) unsupported).
3. Pre-existing runtime errors (NOT regressions, present with empty data): CourseIslandComponent.canView reads undefined course; consent undefined in accounts. Leave unless trivial.
4. ~~Parsons drag-drop (CDK rewrite) not yet browser-verified end-to-end~~ **VERIFIED 2026-07-21** (see "Verified in browser" above); editor typing/katex on create pages verified earlier (issue 1).
5. Backend change is UNCOMMITTED in ../canvas-gamification: settings.py got `"baggage"` added to CORS_ALLOW_HEADERS (needed by Sentry 10 tracing). Decide whether to commit it there.

## GOAL COMPLETE (2026-07-21)
Final verification on the last commit: `npm run build` OK (warnings only: pre-existing 2MB budget + CommonJS dayjs/graphlib notes), `ng lint` 0 errors, unit tests 305/305, browser smoke of all key flows done across 2026-07-20/21. All background servers killed. Only follow-up: item 5 above (uncommitted backend CORS change) and the optional pre-existing runtime errors in item 3.

Restart commands if work resumes:
- backend: `cd ../canvas-gamification && source .venv/bin/activate && python manage.py runserver 8000`
- frontend: `source ~/.nvm/nvm.sh && nvm use 24.16.0 && npx ng serve`

## Environment notes
- Node: use nvm; node 24.16.0 for current stack (`source ~/.nvm/nvm.sh && nvm use 24.16.0`)
- Servers (Django :8000, ng serve :4200) were killed at the 2026-07-20 pause; restart commands above. If running, kill with: `pkill -f "manage.py runserver"; pkill -f "ng serve"`
- Playwright installed in scratchpad dir (/private/tmp/claude-501/.../scratchpad) with test scripts browser-test*.mjs
- npm installs generally need `--force` (peer conflicts); package-lock regenerated
- Do NOT commit to master; branch modernize-deps, do not push
