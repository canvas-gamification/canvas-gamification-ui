import {AuthGuard} from "@app/_helpers/auth.guard"
import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {
    CourseListComponent
} from "@app/course/course-list/course-list.component"
import {
    CourseRegisterComponent
} from "@app/course/course-registration/course-register.component"
import {CourseComponent} from "@app/course/course.component"
import {
    CourseEventCreateEditComponent
} from "@app/course/course-event-create/course-event-create-edit.component"
import {
    CourseQuestionSnippetComponent
} from "@app/course/course-question-snippet/course-question-snippet.component"
import {
    ProblemViewComponent
} from "@app/problems/problem-view/problem-view.component"
import {
    PracticeProblemComponent
} from "@app/course/practice-problem/practice-problem.component"
import {GoalPageComponent} from "@app/course/goal/goal-page/goal-page.component"
import {
    GoalCreateComponent
} from "@app/course/goal/goal-create/goal-create.component"
import {GoalComponent} from "@app/course/goal/goal/goal.component"
import {
    CourseCreateComponent
} from "@app/course/course-create/course-create.component"
import {
    CoursePracticePageComponent
} from "@app/course/course-practice-page/course-practice-page.component"
import {
    CoursePracticeComponent
} from "@app/course/course-practice/course-practice.component"
import {
    TokenUseSnippetComponent
} from "@app/course/token-use-snippet/token-use-snippet.component"
import {
    CourseChallengeSnippetComponent
} from "@app/course/challenge/course-challenge-snippet/course-challenge-snippet.component"
import {
    CourseHomepageComponent
} from "@app/course/course-homepage/course-homepage.component"
import {
    CourseEventsSnippetComponent
} from "@app/course/course-events-snippet/course-events-snippet.component"
import {
    EventStatsComponent
} from "@app/course/event/event-stats/event-stats.component"
import {
    LeaderBoardComponent
} from "@app/course/leader-board/leader-board.component"
import {
    ListOfTeamsComponent
} from "@app/course/challenge/list-of-teams/list-of-teams.component"
import {TeamCreateEditComponent} from './challenge/team-create-edit/team-create-edit.component'
import {
    CourseChallengeCreateEditComponent
} from "@app/course/challenge/course-challenge-create-edit/course-challenge-create-edit.component"

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
                redirectTo: 'homepage',
                pathMatch: 'full'
            },
            {
                path: 'homepage',
                component: CourseHomepageComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }]
                }
            },
            {
                path: 'practice',
                component: CoursePracticePageComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Practice`,
                        routerLink: '/course/:courseId/practice'
                    }]
                }
            },
            {
                path: 'practice/concepts',
                component: CoursePracticeComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Practice`,
                        routerLink: '/course/:courseId/practice'
                    }, {
                        caption: `Concepts`,
                        routerLink: '/course/:courseId/practice/concepts'
                    }]
                }
            },
            {
                path: 'register',
                component: CourseRegisterComponent,
            },
            {
                path: 'assignments-exams',
                component: CourseEventsSnippetComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Assignments and Exams`,
                        routerLink: '/course/:courseId/assignments-exams'
                    }]
                }
            },
            {
                path: 'assignments-exams/create',
                component: CourseEventCreateEditComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Assignments and Exams`,
                        routerLink: '/course/:courseId/assignments-exams'
                    }, {
                        caption: `Create an Assignment or Exam`,
                        routerLink: '/course/:courseId/assignments-exams/create'
                    }]
                }
            },
            {
                path: 'assignments-exams/:eventId/edit',
                component: CourseEventCreateEditComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Assignments and Exams`,
                        routerLink: '/course/:courseId/assignments-exams'
                    }, {
                        caption: `Edit :eventName`,
                        routerLink:
                            '/course/:courseId/assignments-exams/:eventId/edit'
                    }]
                }
            },
            {
                path: 'assignments-exams/:eventId',
                component: CourseQuestionSnippetComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Assignments and Exams`,
                        routerLink: '/course/:courseId/assignments-exams'
                    }, {
                        caption: `:eventName`,
                        routerLink:
                            '/course/:courseId/assignments-exams/:eventId'
                    }]
                }
            },
            {
                path: 'assignments-exams/:eventId/stats',
                component: EventStatsComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Assignments and Exams`,
                        routerLink: '/course/:courseId/assignments-exams'
                    }, {
                        caption: `:eventName`,
                        routerLink:
                            '/course/:courseId/assignments-exams/:eventId'
                    }, {
                        caption: `:eventName Statistics`,
                        routerLink:
                            '/course/:courseId/assignments-exams/:eventId/stats'
                    }]
                }
            },
            {
                path: 'problem/:id',
                component: ProblemViewComponent,
            },
            {
                path: 'assignments-exams/:eventId/problem/:id',
                component: ProblemViewComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Assignments and Exams`,
                        routerLink: '/course/:courseId/assignments-exams'
                    }, {
                        caption: `:eventName`,
                        routerLink:
                            '/course/:courseId/assignments-exams/:eventId'
                    }, {
                        caption: `:questionName`,
                        routerLink:
                            '/course/:courseId/assignments-exams/:eventId/problem/:id'
                    }]
                }
            },
            {
                path: 'goal',
                component: GoalPageComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
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
                        routerLink: '/course/:courseId/homepage'
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
                        routerLink: '/course/:courseId/homepage'
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
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Tokens`,
                        routerLink: '/course/:courseId/token'
                    }]
                }
            },
            {
                path: 'challenge',
                component: CourseChallengeSnippetComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Challenges`,
                        routerLink: '/course/:courseId/challenge'
                    }]
                }
            },
            {
                path: 'challenge/create',
                component: CourseChallengeCreateEditComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Challenges`,
                        routerLink: '/course/:courseId/challenge'
                    }, {
                        caption: `Create Challenge`,
                        routerLink: '/course/:courseId/challenge/create'
                    }]
                }
            },
            {
                path: 'challenge/:eventId/edit',
                component: CourseChallengeCreateEditComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Challenges`,
                        routerLink: '/course/:courseId/challenge'
                    }, {
                        caption: `:eventName`,
                        routerLink: '/course/:courseId/challenge/:eventId'
                    }, {
                        caption: `Edit :eventName`,
                        routerLink: '/course/:courseId/challenge/:eventId/edit'
                    }]
                }
            },
            {
                path: 'challenge/:eventId',
                component: CourseQuestionSnippetComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Challenges`,
                        routerLink: '/course/:courseId/challenge'
                    }, {
                        caption: `:eventName`,
                        routerLink: '/course/:courseId/challenge/:eventId'
                    }]
                }
            },
            {
                path: 'challenge/:eventId/teams',
                component: ListOfTeamsComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Challenges`,
                        routerLink: '/course/:courseId/challenge'
                    }, {
                        caption: `:eventName`,
                        routerLink: '/course/:courseId/challenge/:eventId'
                    }, {
                        caption: `Teams`,
                        routerLink: '/course/:courseId/challenge/:eventId/teams'
                    }]
                }
            },
            {
                path: 'challenge/:eventId/teams/create',
                component: TeamCreateEditComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Challenges`,
                        routerLink: '/course/:courseId/challenge'
                    }, {
                        caption: `:eventName`,
                        routerLink: '/course/:courseId/challenge/:eventId'
                    }, {
                        caption: `Teams`,
                        routerLink: '/course/:courseId/challenge/:eventId/teams'
                    }, {
                        caption: `Create a Team`,
                        routerLink: '/course/:courseId/challenge/:eventId/teams/create'
                    }]
                }
            },
            {
                path: 'challenge/:eventId/teams/:teamId/edit',
                component: TeamCreateEditComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Challenges`,
                        routerLink: '/course/:courseId/challenge'
                    }, {
                        caption: `:eventName`,
                        routerLink: '/course/:courseId/challenge/:eventId'
                    }, {
                        caption: `Teams`,
                        routerLink: '/course/:courseId/challenge/:eventId/teams'
                    }, {
                        caption: `Edit :teamName`,
                        routerLink: '/course/:courseId/challenge/:eventId/teams/:teamId/edit'
                    }]
                }
            },
            {
                path: 'challenge/:eventId/stats',
                component: EventStatsComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Challenges`,
                        routerLink: '/course/:courseId/challenge'
                    }, {
                        caption: `:eventName`,
                        routerLink: '/course/:courseId/challenge/:eventId'
                    }, {
                        caption: `:eventName Statistics`,
                        routerLink: '/course/:courseId/challenge/:eventId/stats'
                    }]
                }
            },
            {
                path: 'challenge/:eventId/problem/:id',
                component: ProblemViewComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
                    }, {
                        caption: `Challenges`,
                        routerLink: '/course/:courseId/challenge'
                    }, {
                        caption: `:eventName`,
                        routerLink: '/course/:courseId/challenge/:eventId'
                    }, {
                        caption: `:questionName`,
                        routerLink: '/course/:courseId/challenge/:eventId/problem/:id'
                    }]
                }
            },
            {
                path: 'leaderboard',
                component: LeaderBoardComponent,
                data: {
                    breadCrumbs: [{
                        caption: `Homepage`,
                        routerLink: '/course/:courseId/homepage'
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
        canActivate: [AuthGuard]
    }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule {
}
