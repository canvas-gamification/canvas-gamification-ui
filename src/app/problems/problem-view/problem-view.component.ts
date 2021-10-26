import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UQJ, User} from '@app/_models';
import {UqjService} from '@app/problems/_services/uqj.service';
import {QuestionSubmission} from '@app/_models/question_submission';
import {SubmissionService} from '@app/problems/_services/submission.service';
import {AuthenticationService} from '@app/_services/api/authentication';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {forkJoin} from "rxjs";
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
                private authenticationService: AuthenticationService,
                private sanitizer: DomSanitizer,
                private toastr: ToastrService,
                private questionService: QuestionService) {
    }

    uqj: UQJ;
    previousSubmissions: QuestionSubmission[];
    user: User;
    safeRenderedText: SafeHtml;
    favorite: number;

    ngOnInit(): void {
        const questionId = this.route.snapshot.params.id;
        this.getFavoriteCount(questionId);
        this.uqjService.getUQJByQuestion(questionId).subscribe(uqj => {
            this.uqj = uqj;
            this.safeRenderedText = this.sanitizer.bypassSecurityTrustHtml(this.uqj.rendered_text);
        });

        this.submissionService.getPreviousSubmissions(questionId, {ordering: '-submission_time'}).subscribe(submissions => {
            this.previousSubmissions = submissions;
        });

        this.authenticationService.currentUser.subscribe(user => {
            this.user = user;
        });
    }

    switchFavourite(uqj: UQJ, favoriteStatus: boolean): void{
        const data : {id: number, status: boolean} = {id: uqj.id, status: !favoriteStatus};
        this.uqjService.updateFavourite(data)
            .subscribe(() => {
                this.toastr.success('The action was performed successfully.');
            });

    }

    getFavoriteCount(questionId: number): void {
        forkJoin({
            favorite: this.questionService.countFavorite(questionId)
        }).subscribe(result => {
            this.favorite = result.favorite;
        });
    }
}
