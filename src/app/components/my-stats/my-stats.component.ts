import {Component, OnInit} from '@angular/core'
import {Category, Course, STATUS, User} from '@app/_models'
import {CourseService} from '@app/course/_services/course.service'
import {ActivatedRoute} from '@angular/router'
import {AuthenticationService} from '@app/_services/api/authentication'
import {ApiService} from "@app/_services/api.service"
import {Stats} from "@app/_models/user_difficulty_stats"
import {UserStatsService} from "@app/_services/api/user-stats.service"
import {CategoryService} from "@app/_services/api/category.service"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {Difficulty} from "@app/_models/difficulty"

@Component({
    selector: 'app-my-stats',
    templateUrl: './my-stats.component.html',
    styleUrls: ['./my-stats.component.scss'],
})
export class MyStatsComponent implements OnInit {
    difficulties: Difficulty[] = []
    topLevelCategories: Category[] = []
    user: User
    stats: Stats
    challengesCompleted: number
    goalsCompleted: number

    mcqNum: number
    parsonsNum: number
    javaNum: number

    activeCourses: Course[]

    totalQuestionsSolved: number
    questionsSolvedByCategory: number[] = []
    questionsSolvedByDifficulty: number[] = []

    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private apiService: ApiService,
        private userStatsService: UserStatsService,
        private categoryService: CategoryService,
        private difficultyService: DifficultyService,
        private courseService: CourseService
    ) {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    ngOnInit(): void {
        this.courseService
            .getCourses(true, {ordering: {name: true}})
            ?.subscribe((courses) => {
                this.activeCourses = courses.filter(course => {
                    return course.status === STATUS.active
                })
            })
        this.categoryService.getCategories().subscribe((categories) => {
            this.topLevelCategories = categories.filter(c => !c.parent)

            this.userStatsService.getUserStats().subscribe(stats => {
                this.stats = stats
                this.challengesCompleted = stats.challenge_stats.challenges_completed
                this.goalsCompleted = stats.goal_stats.goals_completed

                for (const cat of this.topLevelCategories) {
                    this.questionsSolvedByCategory.push(
                        this.stats.category_stats
                            .filter(
                                stats => stats.difficulty === 'ALL' && stats.category === cat.pk
                            )
                            .reduce((sum, obj) => sum + obj.questions_solved, 0)
                    )
                }


                // Get the number of questions solved for each difficulty
                this.difficultyService.getDifficulties().subscribe(difficulties => {
                    this.difficulties = difficulties
                    for (let i = 0; i < this.difficulties.length; i++)
                        this.questionsSolvedByDifficulty.push(
                            stats.category_stats
                                .filter(catStats => catStats.difficulty === difficulties[i][0])
                                .reduce((sum, obj) => sum + obj.questions_solved, 0)
                            / 2 // Divide by 2: To remove double counting the top categories ("ALL")
                        )

                })

                this.totalQuestionsSolved = this.questionsSolvedByCategory
                    .reduce((accumulator, obj) => {
                        return accumulator + obj
                    }, 0)

                this.mcqNum = this.stats.question_stats.mcq.questions_solved
                this.parsonsNum = this.stats.question_stats.parsons.questions_solved
                this.javaNum = this.stats.question_stats.java.questions_solved
            })
        })
    }
}
