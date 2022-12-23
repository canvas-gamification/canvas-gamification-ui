import {AuthGuard} from "@app/_helpers/auth.guard"
import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {CourseListComponent} from "@app/course/course-list/course-list.component"
import {CourseRegisterComponent} from "@app/course/course-registration/course-register.component"
import {CourseComponent} from "@app/course/course.component"
import {CourseEventCreateEditComponent} from "@app/course/course-event-create/course-event-create-edit.component"
import {CourseQuestionSnippetComponent} from "@app/course/course-question-snippet/course-question-snippet.component"
import {ProblemViewComponent} from "@app/problems/problem-view/problem-view.component"
import {PracticeProblemComponent} from "@app/course/practice-problem/practice-problem.component"
import {GoalPageComponent} from "@app/course/goal/goal-page/goal-page.component"
import {GoalCreateComponent} from "@app/course/goal/goal-create/goal-create.component"
import {GoalComponent} from "@app/course/goal/goal/goal.component"
import {CourseCreateComponent} from "@app/course/course-create/course-create.component"
import {CoursePracticePageComponent} from "@app/course/course-practice-page/course-practice-page.component"
import {CoursePracticeComponent} from "@app/course/course-practice/course-practice.component"
import {TokenUseSnippetComponent} from "@app/course/token-use-snippet/token-use-snippet.component"
import {CourseChallengeSnippetComponent} from "@app/course/course-challenge-snippet/course-challenge-snippet.component"
import {CourseHomepageComponent} from "@app/course/course-homepage/course-homepage.component"
import {CourseEventsSnippetComponent} from "@app/course/course-events-snippet/course-events-snippet.component"
import {EventStatsComponent} from "@app/course/event/event-stats/event-stats.component"
import {LeaderBoardComponent} from "@app/course/leader-board/leader-board.component"

const routes: Routes = [
    {
        path: '',
        component: CourseListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'create',
        component: CourseCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':courseId',
        component: CourseComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: CourseHomepageComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }]
                }
            },
            {
                path: 'practice',
                component: CoursePracticePageComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }, {
                        caption: `Practice`,
                        routerLink: '/course/:courseId/practice'
                    }]
                }
            },
            {
                path: 'practice/concept-map',
                component: CoursePracticeComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }, {
                        caption: `Practice`,
                        routerLink: '/course/:courseId/practice'
                    }, {
                        caption: `Concept Map`,
                        routerLink: '/course/:courseId/practice/concept-map'
                    }]
                }
            },
            {
                path: 'register',
                component: CourseRegisterComponent,
            },
            {
                path: 'event',
                component: CourseEventsSnippetComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }, {
                        caption: `Events`,
                        routerLink: '/course/:courseId/event'
                    }]
                }
            },
            {
                path: 'new-event',
                component: CourseEventCreateEditComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }, {
                        caption: `Events`,
                        routerLink: '/course/:courseId/event'
                    }, {
                        caption: `Create Event`,
                        routerLink: '/course/:courseId/new-event'
                    }]
                }
            },
            {
                path: 'new-event/:eventId',
                component: CourseEventCreateEditComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }, {
                        caption: `Events`,
                        routerLink: '/course/:courseId/event'
                    }, {
                        caption: `Edit Event`,
                        routerLink: '/course/:courseId/new-event'
                    }]
                }
            },
            {
                path: 'event/:eventId',
                component: CourseQuestionSnippetComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }, {
                        caption: `Events`,
                        routerLink: '/course/:courseId/event'
                    }, {
                        caption: `Event`,
                        routerLink: '/course/:courseId/event/:eventId'
                    }]
                }
            },
            {
                path: 'event/:eventId/stats',
                component: EventStatsComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }, {
                        caption: `Events`,
                        routerLink: '/course/:courseId/event'
                    }, {
                        caption: `Event`,
                        routerLink: '/course/:courseId/event/:eventId'
                    }, {
                        caption: `Event Statistics`,
                        routerLink: '/course/:courseId/event/:eventId/stats'
                    }]
                }
            },
            {
                path: 'problem/:id',
                component: ProblemViewComponent,
            },
            {
                path: 'event/:eventId/problem/:id',
                component: ProblemViewComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }, {
                        caption: `Events`,
                        routerLink: '/course/:courseId/event'
                    }, {
                        caption: `Event`,
                        routerLink: '/course/:courseId/event/:eventId'
                    }, {
                        caption: `Question`,
                        routerLink: '/course/:courseId/event/:eventId/problem/:id'
                    }]
                }
            },
            {
                path: 'goal',
                component: GoalPageComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }, {
                        caption: `Practice`,
                        routerLink: '/course/:courseId/practice'
                    }, {
                        caption: `Goals`,
                        routerLink: '/course/:courseId/goal'
                    }]
                }
            },
            {
                path: 'goal/create',
                component: GoalCreateComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }, {
                        caption: `Practice`,
                        routerLink: '/course/:courseId/practice'
                    }, {
                        caption: `Goals`,
                        routerLink: '/course/:courseId/goal'
                    }, {
                        caption: `Create Goal`,
                        routerLink: '/course/:courseId/goal/create'
                    }]
                }
            },
            {
                path: 'goal/:goalId',
                component: GoalComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }, {
                        caption: `Practice`,
                        routerLink: '/course/:courseId/practice'
                    }, {
                        caption: `Goals`,
                        routerLink: '/course/:courseId/goal'
                    }, {
                        caption: `Review Goal`,
                        routerLink: '/course/:courseId/goal/:goalId'
                    }]
                }
            },
            {
                path: 'token',
                component: TokenUseSnippetComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }, {
                        caption: `Tokens`,
                        routerLink: '/course/:courseId/token'
                    }]
                }
            },
            {
                path: 'challenges',
                component: CourseChallengeSnippetComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }, {
                        caption: `Challenges`,
                        routerLink: '/course/:courseId/challenges'
                    }]
                }
            },
            {
                path: 'leaderboard',
                component: LeaderBoardComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId'
                    }, {
                        caption: `Leaderboard`,
                        routerLink: '/course/:courseId/leaderboard'
                    }]
                }
            }]
    },
    {
        path: ':courseId/practice/category/:categoryId',
        component: PracticeProblemComponent,
    }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule {
}
