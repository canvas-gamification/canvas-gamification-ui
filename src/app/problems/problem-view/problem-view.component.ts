import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UQJ, User} from '@app/_models';
import {UqjService} from '@app/problems/_services/uqj.service';
import {QuestionSubmission} from '@app/_models/question_submission';
import {SubmissionService} from '@app/problems/_services/submission.service';
import {AuthenticationService} from '@app/_services/api/authentication';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {TuiNotification, TuiNotificationsService} from "@taiga-ui/core";
import {QuestionService} from "@app/problems/_services/question.service";

@Component({
    selector: 'app-problem-view',
    templateUrl: './problem-view.component.html',
    styleUrls: ['./problem-view.component.scss'],
})
export class ProblemViewComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private uqjService: UqjService,
                private submissionService: SubmissionService,
                private questionService: QuestionService,
                @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService,
                private authenticationService: AuthenticationService,
                private sanitizer: DomSanitizer) {
    }


    uqj: UQJ;
    previousSubmissions: QuestionSubmission[];
    user: User;
    safeRenderedText: SafeHtml;
    favorite: number;
    favoriteStatus: {[id: number]: boolean} = {};
    countFavorite: {[id: number]: number} = {};

    ngOnInit(): void {
        const questionId = this.route.snapshot.params.id;
        this.uqjService.getUQJByQuestion(questionId).subscribe(uqj => {
            this.uqj = uqj;
            this.safeRenderedText = this.sanitizer.bypassSecurityTrustHtml(this.uqj.rendered_text);
            this.getFavoriteCount(uqj.question.id, uqj.is_favorite);
        });

        this.submissionService.getPreviousSubmissions(questionId, {ordering: '-submission_time'}).subscribe(submissions => {
            this.previousSubmissions = submissions;
        });

        this.authenticationService.currentUser.subscribe(user => {
            this.user = user;
        });
    }

    switchFavorite(uqjId: number, favoriteStatus: boolean, questionId: number): void {
        const data: { id: number, status: boolean } = {id: uqjId, status: !favoriteStatus};
        this.uqjService.updateFavorite(data)
            .subscribe(() => {
                this.notificationsService
                    .show('Favorite Status was updated', {
                        status: TuiNotification.Success
                    }).subscribe();
                this.getFavoriteCount(questionId, !favoriteStatus);
            });
    }

    getFavoriteCount(questionId: number, favoriteStatus: boolean): void {
        this.questionService.countFavorite(questionId).subscribe(result => {
            this.favorite = result;
            this.countFavorite[questionId] = this.favorite;
            this.favoriteStatus[questionId] = favoriteStatus;
        });
    }
}
