import {Component, Input, OnInit} from '@angular/core';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {CourseRegistration, TokenUseOption} from '@app/_models';
import {TokenUseService} from '@app/_services/api/token-use.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-token-use-snippet',
  templateUrl: './token-use-snippet.component.html',
  styleUrls: ['./token-use-snippet.component.scss']
})
export class TokenUseSnippetComponent implements OnInit {
  @Input() courseReg: CourseRegistration;
  @Input() tokenUseOptions: TokenUseOption[];
  tokenActions = {};
  courseId: number;

  invalid: boolean;

  faMinus = faMinus;
  faPlus = faPlus;

  constructor(private tokenUseService: TokenUseService,
              private route: ActivatedRoute) {
    this.courseId = this.route.snapshot.params.courseId;
  }

  ngOnInit(): void {
    this.courseReg.token_uses.forEach(tokenUse => {
      this.tokenActions[tokenUse.option.id] = tokenUse.num_used;
    });
    // Should always make invalid false unless some truly funky situations are happening
    this.canSave();
  }

  canSave() {
    this.invalid = this.courseReg.available_tokens < 0;
  }

  formatFloat(value: number, fractionDigits: number): string {
    return value.toFixed(fractionDigits);
  }

  incrementAction(optionId: number) {
    ++this.tokenActions[optionId];
  }

  decrementAction(optionId: number) {
    --this.tokenActions[optionId];
  }

  confirmChanges() {
    console.log(this.tokenActions);
    const tokenActionsData = {};
    for (const optionId in this.tokenActions) {
      if (this.tokenActions.hasOwnProperty(optionId)) {
        tokenActionsData[`token_use#${optionId}`] = this.tokenActions[optionId];
      }
    }
    this.tokenUseService.useTokens(tokenActionsData, this.courseId).subscribe(message => {
      console.log(message);
      const display = message.type === 'SUCCESS' || window.location.reload();
    });
  }
}
