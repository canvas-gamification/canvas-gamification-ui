import {Component, Input, OnChanges} from '@angular/core'
import {ActionStatus, ActionType, ActionVerb, Course, LeaderboardElement} from "@app/_models"
import {CourseService} from "@app/course/_services/course.service"
import {CourseEventService} from "@app/course/_services/course-event.service"
import {UserActionsService} from "@app/_services/api/user-actions.service"
import {TeamService} from "@app/course/_services/team.service"
import {Team} from "@app/_models/team"

@Component({
    selector: 'app-leader-board',
    templateUrl: './leader-board.component.html',
    styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnChanges {
    leaderBoard: LeaderboardElement[]
    rankTopX: number
    @Input() course: Course
    @Input() eventId: number
    @Input() leaderBoardName: string
    displayedColumns: string[] = ['rank', 'name', 'token']

    myTeam: Team

    readonly filterOutTopX = (element: LeaderboardElement, x: number): boolean => element.rank > x
    readonly filterInTopX = (element: LeaderboardElement, x: number): boolean => element.rank <= x

    constructor(
        private courseService: CourseService,
        private courseEventService: CourseEventService,
        private userAction: UserActionsService,
        private teamService: TeamService
    ) {
    }

    ngOnChanges(): void {
        this.rankTopX = 3
        if(this.eventId){
            this.courseEventService.getEventLeaderBoard(this.eventId).subscribe(leaderBoard => {
                this.leaderBoard = this.getRankedLeaderboard(leaderBoard)
                this.teamService.getMyTeam(this.eventId).subscribe( team => {
                    this.myTeam = team
                    this.logChallengeRankingAndTokens()
                })
            })
        }else{
            this.courseService.getCourseLeaderBoard(this.course.id).subscribe(leaderBoard => {
                this.leaderBoard = this.getRankedLeaderboard(leaderBoard)
                this.logCourseRankingAndTokens()
            })
        }
    }

    /**
     * Takes an unranked leaderboard, and returns a ranked version of it
     * @param leaderBoard
     */
    getRankedLeaderboard(leaderBoard: LeaderboardElement[]): LeaderboardElement[] {
        const sortedLeaderboard = leaderBoard.sort((a, b) => b.token - a.token)
        return sortedLeaderboard.map((element, index) => {
            return this.eventId? {
                rank: index + 1,
                name: element.name,
                token: element.token,
                member_names: element.member_names,
                team_id: element.team_id
            } : {
                rank: index + 1,
                name: element.name,
                token: element.token,
                course_reg_id: element.course_reg_id
            }
        })
    }

    /**
     * Takes a number and returns the ordinal version of it
     * @implements https://community.shopify.com/c/shopify-design/ordinal-number-in-javascript-1st-2nd-3rd-4th/m-p/72156
     * @param n
     */
    getGetOrdinal(n: number): string {
        const s = ["th", "st", "nd", "rd"],
            v = n % 100
        return n + (s[(v - 20) % 10] || s[v] || s[0])
    }


    getRanking(): number | string {
        if (this.eventId){
            if (!this.leaderBoard.some(element => element.team_id === this.myTeam.id))
                return 'No ranking. User not on leader board.'
            return this.leaderBoard.find(element => element.team_id === this.myTeam.id).rank
        } else {
            if (!this.leaderBoard.some(element => element.course_reg_id === this.course.id))
                return 'No ranking. User not on leader board.'
            return this.leaderBoard.find(element => element.course_reg_id === this.course.id).rank
        }
    }

    getTokens(): number | string {
        if (this.eventId){
            if (!this.leaderBoard.some(element => element.team_id === this.myTeam.id))
                return 'No tokens. User not on leader board.'
            return this.leaderBoard.find(element => element.team_id === this.myTeam.id).token
        } else {
            if (!this.leaderBoard.some(element => element.course_reg_id === this.course.id))
                return 'No tokens. User not on leader board.'
            return this.leaderBoard.find(element => element.course_reg_id === this.course.id).token
        }
    }

    logCourseRankingAndTokens(): void {
        this.userAction.createCustomAction({
            description: 'User viewed personal ranking and tokens earned on the course leader board',
            status: ActionStatus.COMPLETE,
            verb: ActionVerb.READ,
            object_type: ActionType.COURSE,
            object_id: this.course.id,
            data: {
                ranking: this.getRanking(),
                token: this.getTokens()
            },
        })
    }

    logChallengeRankingAndTokens(): void {
        this.userAction.createCustomAction({
            description: 'User viewed team ranking and tokens earned on a challenge leader board',
            status: ActionStatus.COMPLETE,
            verb: ActionVerb.READ,
            object_type: ActionType.EVENT,
            object_id: this.eventId,
            data: {
                ranking: this.getRanking(),
                token: this.getTokens()
            },
        })
    }
}
