import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import * as Sentry from "@sentry/angular";
import {BrowserTracing} from "@sentry/tracing";

import {AppModule} from '@app/app.module';
import {environment} from '@environments/environment';

if (environment.production) {
    enableProdMode();
}

Sentry.init({
    dsn: "https://d0d0f6b3ee1f4be5844ee9c788a4addf@o1175156.ingest.sentry.io/6271878",
    integrations: [
        new BrowserTracing({
            tracingOrigins: ["localhost", "https://gamification.ok.ubc.ca"],
            routingInstrumentation: Sentry.routingInstrumentation,
        }),
    ],
    tracesSampleRate: 1.0,
});

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
