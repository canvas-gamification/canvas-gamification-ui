import {Component, Input, OnInit} from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import {CourseRegistration, TokenUseOption} from '@app/_models';

@Component({
  selector: 'app-token-use-snippet',
  templateUrl: './token-use-snippet.component.html',
  styleUrls: ['./token-use-snippet.component.scss']
})
export class TokenUseSnippetComponent implements OnInit {
  @Input() courseReg: CourseRegistration;
  @Input() tokenUseOptions: TokenUseOption[];
  tokenActions = {}

  faMinus = faMinus;
  faPlus = faPlus;

  constructor() {
  }

  ngOnInit(): void {
    this.tokenUseOptions.forEach(token_use => this.tokenActions[token_use.id] = 0);
  }


  formatFloat(value: number, fractionDigits: number): string {
    return value.toFixed(fractionDigits);
  }

  useTokensOption(id: number) {
    return true;
  }

  unuseTokensOption(id) {
    return true;
  }

  incrementAction(){

  }

  decrementAction(){

  }

}
