import {enableProdMode, provideZoneChangeDetection} from '@angular/core'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'

import * as Sentry from "@sentry/angular"

import {AppModule} from '@app/app.module'
import {environment} from '@environments/environment'

if (environment.production) {
    enableProdMode()
}

Sentry.init({
    dsn: "https://d0d0f6b3ee1f4be5844ee9c788a4addf@o1175156.ingest.sentry.io/6271878",
    integrations: [
        Sentry.browserTracingIntegration(),
    ],
    tracePropagationTargets: ["localhost", "https://gamification.ok.ubc.ca"],
    tracesSampleRate: 0.1,
})

platformBrowserDynamic().bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()], })
    .catch(err => console.error(err))
