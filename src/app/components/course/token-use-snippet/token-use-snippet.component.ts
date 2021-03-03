import {Component, Input, OnInit} from '@angular/core';
import {CourseRegistration, TokenUseOption} from '@app/_models';

@Component({
  selector: 'app-token-use-snippet',
  templateUrl: './token-use-snippet.component.html',
  styleUrls: ['./token-use-snippet.component.scss']
})
export class TokenUseSnippetComponent implements OnInit {
  @Input() tokenUseOptions: TokenUseOption[];
  @Input() courseReg: CourseRegistration;

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
