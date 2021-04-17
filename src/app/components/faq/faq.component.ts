import {Component, OnInit} from '@angular/core';
import {FaqService} from '@app/_services/api/faq.service';
import {Faq} from '@app/_models/faq';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

    faqs: Faq[];
    emptyObservable = true;

    constructor(public faqService: FaqService) {
    }

    ngOnInit(): void {
        this.faqService
            .getFaqs()
            .subscribe((faqs) => {
                this.faqs = faqs;
                this.emptyObservable = !faqs.length;
            });
    }

}
