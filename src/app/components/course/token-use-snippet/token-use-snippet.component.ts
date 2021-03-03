import {Component, Input, OnInit} from '@angular/core';
import {TokenUseOption} from '@app/_models';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-token-use-snippet',
  templateUrl: './token-use-snippet.component.html',
  styleUrls: ['./token-use-snippet.component.scss']
})
export class TokenUseSnippetComponent implements OnInit {
  @Input() tokenUseOptions: TokenUseOption[];

  tokenActions = {}

  courseReg = {
    total_tokens_received: 55.555,
    available_tokens: 75.9183,
    get_token_uses: [
      {
        num_used: 5,
        option: {
          id: 5,
          assignment_name: 'Something Cool',
          tokens_required: 56.141248,
          points_given: 55.492864,
          maximum_number_of_use: 8,
        }
      }
    ]
  };

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
