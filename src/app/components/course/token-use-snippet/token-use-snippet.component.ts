import {Component, Input, OnInit} from '@angular/core';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {CourseRegistration, TokenUseOption} from '@app/_models';

@Component({
  selector: 'app-token-use-snippet',
  templateUrl: './token-use-snippet.component.html',
  styleUrls: ['./token-use-snippet.component.scss']
})
export class TokenUseSnippetComponent implements OnInit {
  @Input() courseReg: CourseRegistration;
  @Input() tokenUseOptions: TokenUseOption[];
  tokenActions = {};

  invalid: boolean;

  faMinus = faMinus;
  faPlus = faPlus;

  constructor() {
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
    // TODO: make a post request to the use tokens service
    console.log(this.tokenActions);
  }
}
