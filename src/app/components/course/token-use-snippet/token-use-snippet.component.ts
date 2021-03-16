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

  currentTokenActions = {};
  prevTokenActions = {}
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
      this.currentTokenActions[tokenUse.option.id] = tokenUse.num_used;
      this.prevTokenActions[tokenUse.option.id] = tokenUse.num_used;
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
    this.changeTokenUse(token_use, this.currentTokenActions[token_use.option.id]+1)
  }

  decrementAction(token_use: TokenUse) {
    this.changeTokenUse(token_use, this.currentTokenActions[token_use.option.id]-1)
  }

  // This is messy... but it somehow handles null as well? Is this a really dumb way of doing this?
  changeTokenUse(token_use: TokenUse, newVal: number){
    // Handles user typing a change... basically change the linked value to what it was earlier, and redo the change properly
    if(this.currentTokenActions[token_use.option.id] != this.prevTokenActions[token_use.option.id]){
      let temp = this.currentTokenActions[token_use.option.id]
      this.currentTokenActions[token_use.option.id] = this.prevTokenActions[token_use.option.id]
      this.changeTokenUse(token_use,temp)
    }
    let change = newVal - this.currentTokenActions[token_use.option.id];
    if (newVal > token_use.option.maximum_number_of_use){
      this.changeTokenUse(token_use, token_use.option.maximum_number_of_use);
      return;
    }else if (newVal < 0){
      this.changeTokenUse(token_use,0)
      return;
    }else{
      this.currentTokenActions[token_use.option.id] = newVal
      this.prevTokenActions[token_use.option.id] = newVal
      this.currentTotal -= change*token_use.option.tokens_required
    }
    this.canSave()
  }

  typingChanges(token_use: TokenUse, newVal: number){
    this.changeTokenUse(token_use,this.currentTokenActions[token_use.option.id])
  }

  confirmChanges() {
    console.log(this.currentTokenActions);
    this.tokenUseService.useTokens(this.currentTokenActions, this.courseId).subscribe(apiResponse => {
      console.log(apiResponse);
      const display = apiResponse.success || window.location.reload();
    });
  }
}
