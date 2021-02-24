import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-token-use-snippet',
  templateUrl: './token-use-snippet.component.html',
  styleUrls: ['./token-use-snippet.component.scss']
})
export class TokenUseSnippetComponent implements OnInit {
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

  constructor() {
  }

  ngOnInit(): void {
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

}
