import {Component, Input, OnInit} from '@angular/core';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {CourseRegistration, TokenUseOption} from '@app/_models';
import {TokenUseService} from '@app/_services/api/token-use.service';
import {ActivatedRoute} from '@angular/router';
import { TokenUse } from '@app/_models/token_use';

@Component({
  selector: 'app-token-use-snippet',
  templateUrl: './token-use-snippet.component.html',
  styleUrls: ['./token-use-snippet.component.scss']
})
export class TokenUseSnippetComponent implements OnInit {
  @Input() courseReg: CourseRegistration;

  tokenActions = {};
  courseId: number;

  invalid: boolean;
  currentTotal: number;

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
    this.currentTotal = this.courseReg.available_tokens;
    this.canSave();
  }

  canSave() {
    this.invalid = this.currentTotal < 0;
    return this.invalid;
  }

  formatFloat(value: number, fractionDigits: number): string {
    return value.toFixed(fractionDigits);
  }

  // Is this actually safe? I'm not 100% sure
  incrementAction(token_use: TokenUse) {
    console.log(this.tokenActions[token_use.option.id]+1)
    this.changeTokenUse(token_use, this.tokenActions[token_use.option.id]+1)
  }

  decrementAction(token_use: TokenUse) {
    console.log(this.tokenActions[token_use.option.id]-1)
    this.changeTokenUse(token_use, this.tokenActions[token_use.option.id]-1)
  }

  changeTokenUse(token_use: TokenUse, newVal: number){
    let change = newVal - this.tokenActions[token_use.option.id];
    if (newVal > token_use.option.maximum_number_of_use)
      this.changeTokenUse(token_use, token_use.option.maximum_number_of_use);
    else if (newVal < 0){
      this.changeTokenUse(token_use,0)
    }else{
      this.tokenActions[token_use.option.id] = newVal
      this.currentTotal -= change*token_use.option.tokens_required
    }
    this.canSave()
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
