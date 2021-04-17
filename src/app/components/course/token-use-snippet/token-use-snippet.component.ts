import {Component, Input, OnInit} from '@angular/core';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {CourseRegistration, MESSAGE_TYPES, User} from '@app/_models';
import {TokenUseService} from '@app/_services/api/token-use.service';
import {ActivatedRoute} from '@angular/router';
import {TokenUse} from '@app/_models/token_use';
import {AuthenticationService} from '@app/_services/api/authentication';
import {MessageService} from '@app/_services/message.service';

@Component({
    selector: 'app-token-use-snippet',
    templateUrl: './token-use-snippet.component.html',
    styleUrls: ['./token-use-snippet.component.scss']
})
export class TokenUseSnippetComponent implements OnInit {
    @Input() courseReg: CourseRegistration;

    tokenUses: {
        [index: number]: TokenUse;
    } = {};

    user: User;

    invalid: boolean;
    remainingTokens: number;

    faMinus = faMinus;
    faPlus = faPlus;

    constructor(private tokenUseService: TokenUseService,
                private route: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private messageService: MessageService) {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
        this.courseReg.token_uses.forEach(tokenUse => {
            this.tokenUses[tokenUse.option.id] = tokenUse;
        });
        this.calculateCurrentTotal();
    }

    useToken(tokenUse: TokenUse, val: number) {
        tokenUse.num_used += val;
        this.calculateCurrentTotal();
    }

    calculateCurrentTotal() {
        this.remainingTokens = this.courseReg.total_tokens_received;
        for (const optionId in this.tokenUses) {
            this.remainingTokens -= this.tokenUses[optionId].num_used * this.tokenUses[optionId].option.tokens_required;
        }
        this.invalid = this.remainingTokens < 0;
    }

    confirmChanges() {
        const courseId = this.route.snapshot.params.courseId;
        const data = {};
        for (const optionId in this.tokenUses) {
            data[optionId] = this.tokenUses[optionId].num_used;
        }

        this.tokenUseService.useTokens(data, courseId).subscribe(() => {
            this.messageService.add(MESSAGE_TYPES.SUCCESS, 'Token uses saved!.');
        });
    }
}
