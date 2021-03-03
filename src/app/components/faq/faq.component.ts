import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../_services/api/faq.service';
import { Faq } from '../../_models/faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqs: Faq[];

  constructor(public FaqService: FaqService) {}

  ngOnInit(): void {
    this.FaqService
    .getFaqs()
    .subscribe((faqs) => {
      this.faqs = faqs;
    });
  }

}
