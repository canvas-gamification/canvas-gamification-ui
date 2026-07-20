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
1. **/problems/create/:type page body is blank** — runtime crash `TypeError: icon?.match is not a function` in tuiGetIconMode (vendor). Some icon input receives a non-string (likely a template/object passed to something expecting icon name string, e.g. tuiHintDescribe/tuiHint or iconStart binding in problem-create-edit tree, or TuiSelect/variation-types-selector). Header/footer render; page content doesn't. Reproduce: login as teacher, go to /problems/create/mcq.
2. **Unit tests**: 305 specs; compile now, majority pass, but: some suites fail (ConceptMap x2, CourseEventCreate NG0100 ExpressionChanged, McqCreateEditSnippet ~7, ParsonsCreateEditSnippet ~4, EditorComponent socket test) AND one spec hangs Chrome (60s disconnect) when full suite runs (order seed 4321). Suite was already broken on master (mock.ts didn't compile) so this is still net-better.
3. Pre-existing runtime errors (NOT regressions, present with empty data): CourseIslandComponent.canView reads undefined course; consent undefined in accounts. Leave unless trivial.
4. Editor "example text" behavior of tui-editor and parsons drag-drop not yet browser-verified (blocked by issue 1 for create pages).

## Environment notes
- Node: use nvm; node 24.16.0 for current stack (`source ~/.nvm/nvm.sh && nvm use 24.16.0`)
- Servers currently running in background: Django on :8000 (/tmp/backend.log), ng serve on :4200 (/tmp/ngserve.log). MUST be killed before finishing: `pkill -f "manage.py runserver"; pkill -f "ng serve"`
- Playwright installed in scratchpad dir (/private/tmp/claude-501/.../scratchpad) with test scripts browser-test*.mjs
- npm installs generally need `--force` (peer conflicts); package-lock regenerated
- Do NOT commit to master; branch modernize-deps, do not push
