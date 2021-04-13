import {Component, Input, OnInit} from '@angular/core';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {CourseRegistration, User} from '@app/_models';
import {TokenUseService} from '@app/_services/api/token-use.service';
import {ActivatedRoute} from '@angular/router';
import {TokenUse} from '@app/_models/token_use';
import {AuthenticationService} from '@app/_services/api/authentication';

@Component({
    selector: 'app-token-use-snippet',
    templateUrl: './token-use-snippet.component.html',
    styleUrls: ['./token-use-snippet.component.scss']
})
export class TokenUseSnippetComponent implements OnInit {
    @Input() courseReg: CourseRegistration;
    user: User;

    currentTokenActions = {};
    prevTokenActions = {};
    courseId: number;

    invalid: boolean;
    currentTotal: number;

    faMinus = faMinus;
    faPlus = faPlus;

    constructor(private tokenUseService: TokenUseService,
                private route: ActivatedRoute,
                private authenticationService: AuthenticationService) {
        this.courseId = this.route.snapshot.params.courseId;
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
        this.courseReg.token_uses.forEach(tokenUse => {
            this.currentTokenActions[tokenUse.option.id] = tokenUse.num_used;
            // Have to keep track of previous to detect changes when user types, due to double binding
            this.prevTokenActions[tokenUse.option.id] = tokenUse.num_used;
        });
        // Should always make invalid false unless some truly funky situations are happening
        this.currentTotal = this.courseReg.available_tokens;
        this.invalid = this.currentTotal < 0;
    }

    formatFloat(value: number, fractionDigits: number): string {
        return value.toFixed(fractionDigits);
    }

    incrementAction(tokenUse: TokenUse) {
        this.changeTokenUse(tokenUse, this.currentTokenActions[tokenUse.option.id] + 1);
    }

    decrementAction(tokenUse: TokenUse) {
        this.changeTokenUse(tokenUse, this.currentTokenActions[tokenUse.option.id] - 1);
    }

    changeTokenUse(tokenUse: TokenUse, newVal: number) {
        // Handles user typing a change... basically change the linked value to what it was earlier, and redo the change properly
        // Since input is double bound, if user types a change and this event is called, you can't get the delta with the previous value
        if (this.currentTokenActions[tokenUse.option.id] !== this.prevTokenActions[tokenUse.option.id]) {
            const temp = this.currentTokenActions[tokenUse.option.id];
            this.currentTokenActions[tokenUse.option.id] = this.prevTokenActions[tokenUse.option.id];
            this.changeTokenUse(tokenUse, temp);
        }
        const change = newVal - this.currentTokenActions[tokenUse.option.id];
        if (newVal > tokenUse.option.maximum_number_of_use) {
            this.changeTokenUse(tokenUse, tokenUse.option.maximum_number_of_use);
            return;
        } else if (newVal < 0) {
            this.changeTokenUse(tokenUse, 0);
            return;
        } else {
            this.currentTokenActions[tokenUse.option.id] = newVal;
            this.prevTokenActions[tokenUse.option.id] = newVal;
            this.currentTotal -= change * tokenUse.option.tokens_required;
        }
        this.invalid = this.currentTotal < 0;
    }

    typingChanges(tokenUse: TokenUse, newVal: number) {
        this.changeTokenUse(tokenUse, this.currentTokenActions[tokenUse.option.id]);
    }

    confirmChanges() {
        this.tokenUseService.useTokens(this.currentTokenActions, this.courseId).subscribe(apiResponse => {
            if (!apiResponse.success) {
                window.location.reload();
            }
        });
    }
}
