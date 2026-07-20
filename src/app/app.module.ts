import { TUI_EDITOR_SANITIZER } from "@taiga-ui/editor";
import { TuiCardLarge } from "@taiga-ui/layout";
import { TuiDrawer, TuiInputNumber, TuiAutoColorPipe, TuiInitialsPipe } from "@taiga-ui/kit";
import { TuiActiveZone } from "@taiga-ui/cdk";
import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {LandingPageComponent} from './components/landing-page/landing-page.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HeaderComponent} from './components/header/header.component'
import {SampleQuestionsComponent} from './components/sample-questions/sample-questions.component'
import {TopicsComponent} from './components/topics/topics.component'
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha-2'
import {TokenValuesComponent} from './components/token-values/token-values.component'
import {ErrorInterceptor, JwtInterceptor} from '@app/_helpers'
import {HomepageComponent} from './components/homepage/homepage.component'
import {UserActionsComponent} from './components/homepage/user-actions/user-actions.component'
import {
    CourseDashboardComponent
} from './components/homepage/course-dashboard/course-dashboard.component'
import {
    InactiveCoursesComponent
} from './components/homepage/inactive-courses/inactive-courses.component'
import {FaqComponent} from './components/faq/faq.component'
import {CommonModule} from '@angular/common'
import {NotFoundComponent} from './components/general/not-found/not-found.component'
import {ForbiddenComponent} from './components/general/forbidden/forbidden.component'
import {MyStatsComponent} from "@app/components/my-stats/my-stats.component"

import { TuiRoot, TuiDataList, TuiLoader, TuiDropdown, TuiIcon, TuiLink, TuiDialog, TuiButton, TuiPopup, provideTaiga, TuiRadio, TUI_VALIDATION_ERRORS } from '@taiga-ui/core'
import { TuiAvatar, TuiSwitch, TuiBlock } from '@taiga-ui/kit'
import {PipesModule} from '@app/_helpers/pipes/pipes.module'
import {CourseIslandModule} from '@app/components/course-island/course-island.module'
import { TuiTablePagination, TuiTable } from '@taiga-ui/addon-table'
import {FaqAccordionModule} from '@app/components/faq-accordion/faq-accordion.module'
import {ProblemsModule} from '@app/problems/problems.module'
import {ContactModule} from '@app/components/contact/contact.module'
import {CodeEditorModule} from '@app/components/code-editor/code-editor.module'
import {FooterModule} from '@app/components/footer/footer.module'
import {NgDompurifySanitizer} from '@taiga-ui/dompurify'
import {SidebarModule} from '@app/components/sidebar/sidebar.module'
import {CommunityComponent} from './components/community/community.component'

@NgModule({ declarations: [
        AppComponent,
        CommunityComponent,
        CourseDashboardComponent,
        FaqComponent,
        ForbiddenComponent,
        HeaderComponent,
        HomepageComponent,
        InactiveCoursesComponent,
        LandingPageComponent,
        MyStatsComponent,
        NotFoundComponent,
        SampleQuestionsComponent,
        TokenValuesComponent,
        TopicsComponent,
        UserActionsComponent,
    ],
    bootstrap: [AppComponent], imports: [AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CodeEditorModule,
        CommonModule,
        ContactModule,
        CourseIslandModule,
        FaqAccordionModule,
        FooterModule,
        FormsModule,
        PipesModule,
        ProblemsModule,
        ReactiveFormsModule,
        RecaptchaFormsModule,
        RecaptchaModule,
        SidebarModule,
        TuiActiveZone,
        TuiAvatar,
        TuiButton,
        ...TuiDataList,
        TuiDialog,
        ...TuiDropdown,
        ...TuiInputNumber,
        TuiCardLarge,
        TuiLink,
        TuiLoader,
        TuiBlock,
        ...TuiRadio,
        TuiRoot,
        TuiDrawer,
        TuiPopup,
        TuiIcon,
        ...TuiTable,
        TuiTablePagination,
        TuiSwitch,
        TuiInitialsPipe,
        TuiAutoColorPipe
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'This field is required!',
                email: 'Enter a valid email address!',
                minlength: 'Password must contain at least 8 characters.',
                confirmedValidator: 'Passwords must match!'
            },
        },
        {
            provide: TUI_EDITOR_SANITIZER,
            useClass: NgDompurifySanitizer
        },
        provideTaiga(),
        provideHttpClient(withXhr(), withInterceptorsFromDi())
    ] })
export class AppModule {
}
