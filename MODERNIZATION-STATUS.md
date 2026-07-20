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
- Backend: ../canvas-gamification, .venv python 3.9, `manage.py runserver 8000`; test user claudetest@example.com (Teacher role) exists in db.sqlite3

## OPEN ISSUES (in priority order)
1. ~~/problems/create/:type page body is blank~~ **FIXED**: root cause was `[iconEnd]="templateRef"` (ng-template with rotating tui-icon chevron) — Taiga 5 `iconEnd` only accepts a string icon name; tuiGetIconMode crashed on the TemplateRef. Replaced with `[tuiChevron]` directive (same rotate-on-open UX) in variables-editor, problem-set, admin, course-question-snippet. Also moved misplaced `[ngModelOptions]`/`(ngModelChange)` from `<tui-textfield>` to the native input/textarea in the 4 json-editors + katex-tool (fixed NG01352 error and katex live preview not updating). Note: route type is case-sensitive — MCQ page is /problems/create/MCQ (lowercase mcq renders nothing by design). All 3 create pages verified in browser (editors render, typing works, katex preview renders).
2. **Unit tests** (IN PROGRESS — resume here): 305 specs; compile now, majority pass, but: some suites fail (ConceptMap x2, CourseEventCreate NG0100 ExpressionChanged, McqCreateEditSnippet ~7, ParsonsCreateEditSnippet ~4, EditorComponent socket test) AND one spec hangs Chrome (60s disconnect) when full suite runs (order seed 4321). Suite was already broken on master (mock.ts didn't compile) so this is still net-better.
   - A subagent session (2026-07-20) was fixing these when paused. It had gotten McqCreateEditSnippet to 4/5 passing and left ONE UNCOMMITTED, UNVERIFIED edit in the working tree: `src/app/course/_test/course-event-create-edit/course-event-create-edit.component.spec.ts` (adds StringifyTuiDataListPipe + component to `declarations`, stubs `router.navigate` to stop lazy-load inside fakeAsync). Verify it compiles/passes before keeping — check whether a `declarations` key already existed (risk of duplicate key) and that `Router` is imported.
3. Pre-existing runtime errors (NOT regressions, present with empty data): CourseIslandComponent.canView reads undefined course; consent undefined in accounts. Leave unless trivial.
4. Parsons drag-drop (CDK rewrite) not yet browser-verified end-to-end; editor typing/katex on create pages now verified (issue 1).
5. Backend change is UNCOMMITTED in ../canvas-gamification: settings.py got `"baggage"` added to CORS_ALLOW_HEADERS (needed by Sentry 10 tracing). Decide whether to commit it there.

## Remaining before goal complete
- Finish unit-test fixes (issue 2), re-run full suite for final tally
- Final verification pass: `npm run build`, `npx ng lint`, browser smoke (login, problems, create pages, parsons drag-drop)
- Kill background servers when done (see below) — done for the 2026-07-20 pause; restart on resume:
  - backend: `cd ../canvas-gamification && source .venv/bin/activate && python manage.py runserver 8000`
  - frontend: `source ~/.nvm/nvm.sh && nvm use 24.16.0 && npx ng serve`

## Environment notes
- Node: use nvm; node 24.16.0 for current stack (`source ~/.nvm/nvm.sh && nvm use 24.16.0`)
- Servers (Django :8000, ng serve :4200) were killed at the 2026-07-20 pause; restart commands above. If running, kill with: `pkill -f "manage.py runserver"; pkill -f "ng serve"`
- Playwright installed in scratchpad dir (/private/tmp/claude-501/.../scratchpad) with test scripts browser-test*.mjs
- npm installs generally need `--force` (peer conflicts); package-lock regenerated
- Do NOT commit to master; branch modernize-deps, do not push
