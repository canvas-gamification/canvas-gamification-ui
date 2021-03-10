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
  
  invalid: Boolean;


  faMinus = faMinus;
  faPlus = faPlus;

  constructor() {
  }

  ngOnInit(): void {
    // Should always be true unless some truly funky situations are happening
    this.invalid = this.courseReg.available_tokens < 0
  }


  formatFloat(value: number, fractionDigits: number): string {
    return value.toFixed(fractionDigits);
  }

  useTokensOption(id: number) {
  }

  unuseTokensOption(id: number) {
    
  }

  saveChanges(){

  }

}
