import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';
import {SampleQuestionsComponent} from './components/sample-questions/sample-questions.component';
import {TopicsComponent} from './components/topics/topics.component';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import {UserStatsComponent} from './components/user-stats/user-stats.component';
import {TokenValuesComponent} from './components/token-values/token-values.component';
import {ErrorInterceptor, JwtInterceptor} from '@app/_helpers';
import {HomepageComponent} from './components/homepage/homepage.component';
import {RecentUserActionsComponent} from './components/homepage/recent-user-actions/recent-user-actions.component';
import {UserActionsComponent} from './components/homepage/user-actions/user-actions.component';
import {
    RecentViewedQuestionsComponent
} from './components/homepage/recent-viewed-questions/recent-viewed-questions.component';
import {CourseDashboardComponent} from './components/homepage/course-dashboard/course-dashboard.component';
import {InactiveCoursesComponent} from './components/homepage/inactive-courses/inactive-courses.component';
import {FaqComponent} from './components/faq/faq.component';
import {CommonModule} from '@angular/common';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';
import {NotFoundComponent} from './components/general/not-found/not-found.component';
import {ForbiddenComponent} from './components/general/forbidden/forbidden.component';
import {AdminComponent} from './admin/admin.component';
import {AdminModule} from "@app/admin/admin.module";
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiDropdownControllerModule,
    TuiHostedDropdownModule,
    TuiLinkModule,
    TuiRootModule,
    TuiSvgModule,
    TuiThemeNightModule,
    TuiNotificationsModule,
    TuiDialogModule,
    TuiLoaderModule,
    TuiModeModule
} from '@taiga-ui/core';
import {
    TuiAvatarModule,
    TuiDropdownHoverModule,
    TuiRadioBlockModule,
    TuiInputCountModule,
    TuiIslandModule,
    TuiToggleModule,
    TuiMarkerIconModule, TUI_VALIDATION_ERRORS
} from "@taiga-ui/kit";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {TuiActiveZoneModule} from "@taiga-ui/cdk";
import {PipesModule} from "@app/_helpers/pipes/pipes.module";
import {CourseIslandModule} from "@app/components/course-island/course-island.module";
import {TuiTableModule, TuiTablePaginationModule} from "@taiga-ui/addon-table";
import {FaqAccordionModule} from "@app/components/faq-accordion/faq-accordion.module";
import {AceEditorModule} from "ng2-ace-editor";
import {ProblemsModule} from "@app/problems/problems.module";
import {ContactModule} from "@app/components/contact/contact.module";

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent,
        HeaderComponent,
        TopicsComponent,
        SampleQuestionsComponent,
        UserStatsComponent,
        TokenValuesComponent,
        FaqComponent,
        HomepageComponent,
        RecentUserActionsComponent,
        UserActionsComponent,
        RecentViewedQuestionsComponent,
        CourseDashboardComponent,
        InactiveCoursesComponent,
        NotFoundComponent,
        ForbiddenComponent,
        AdminComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        FormsModule,
        CommonModule,
        HighlightModule,
        HighlightModule,
        TuiRootModule,
        TuiThemeNightModule,
        TuiToggleModule,
        TuiLinkModule,
        TuiHostedDropdownModule,
        TuiDropdownHoverModule,
        TuiDataListModule,
        TuiButtonModule,
        TuiAvatarModule,
        TuiSvgModule,
        TuiDropdownControllerModule,
        TuiSidebarModule,
        TuiActiveZoneModule,
        TuiNotificationsModule,
        AdminModule,
        TuiDialogModule,
        TuiIslandModule,
        PipesModule,
        CourseIslandModule,
        TuiLoaderModule,
        TuiTableModule,
        TuiTablePaginationModule,
        FaqAccordionModule,
        AceEditorModule,
        TuiRadioBlockModule,
        ProblemsModule,
        TuiMarkerIconModule,
        ContactModule,
        TuiModeModule,
        TuiInputCountModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                coreLibraryLoader: () => import('highlight.js/lib/core'),
                lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
                languages: {
                    java: () => import('highlight.js/lib/languages/java')
                }
            }
        },
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'This field is required!',
                email: 'Enter a valid email address!',
                minlength: 'Password must contain at least 8 characters.',
                confirmedValidator: 'Passwords must match!'
            },
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
