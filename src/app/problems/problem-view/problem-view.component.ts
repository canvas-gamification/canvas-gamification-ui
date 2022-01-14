import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UQJ, User} from '@app/_models';
import {UqjService} from '@app/problems/_services/uqj.service';
import {QuestionSubmission} from '@app/_models/question_submission';
import {SubmissionService} from '@app/problems/_services/submission.service';
import {AuthenticationService} from '@app/_services/api/authentication';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

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
                private sanitizer: DomSanitizer) {
    }

    uqj: UQJ;
    previousSubmissions: QuestionSubmission[];
    user: User;
    safeRenderedText: SafeHtml;

    ngOnInit(): void {
        const questionId = this.route.snapshot.params.id;
        this.uqjService.getUQJByQuestion(questionId).subscribe(uqj => {
            this.uqj = uqj;
            this.safeRenderedText = this.sanitizer.bypassSecurityTrustHtml(this.uqj.rendered_text);
            this.startTimer(uqj.id);
        });

        this.submissionService.getPreviousSubmissions(questionId, {ordering: '-submission_time'}).subscribe(submissions => {
            this.previousSubmissions = submissions;
        });

        this.authenticationService.currentUser.subscribe(user => {
            this.user = user;
        });
    }

    startTimer(uqj: number): void{
        let time;
        let timing;
        const hiddenProperty = 'hidden' in document ? 'hidden' :
            'webkitHidden' in document ? 'webkitHidden' :
                'mozHidden' in document ? 'mozHidden' :
                    null;

        const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');

        const timer = function(){
            const tempTime = parseInt(localStorage.getItem(String(uqj)));
            if(tempTime!==undefined && !isNaN(tempTime)){
                time=parseInt(localStorage.getItem(String(uqj)));
            }
            else{
                time=0;
            }
            time=time+1;
            localStorage.setItem(String(uqj), time.toString());
        };

        const onVisibilityChange = function(){
            if (!document[hiddenProperty]) {
                if(timing===null){
                    timing = setInterval(timer,1000);
                }

            }else{
                if(timing!==null){
                    clearInterval(timing);
                    timing=null;
                }

            }
        };

        time = 0;



        timing = setInterval(timer, 1000);

        document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    }
}
