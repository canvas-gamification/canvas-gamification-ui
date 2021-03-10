import {Component, Input, OnInit} from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import {CourseRegistration, TokenUseOption} from '@app/_models';
import { TokenUse } from '@app/_models/token_use';


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
    // Should always make invalid false unless some truly funky situations are happening
    this.canSave()
  }

  canSave(){
    this.invalid = this.courseReg.available_tokens < 0
  }

  formatFloat(value: number, fractionDigits: number): string {
    return value.toFixed(fractionDigits);
  }

  useTokensOption(use: TokenUse) {
    console.log("use")
    use.num_used += 1

  }

  unuseTokensOption(use: TokenUse) {
    console.log("unuse")
    use.num_used -= 1
  }

  saveChanges(){

  }

}
