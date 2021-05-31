import {Component, OnInit} from '@angular/core';
import {FaqService} from '@app/_services/api/faq.service';
import {Faq} from '@app/_models/faq';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

    faqs: Faq[];

    constructor(public faqService: FaqService,
                public sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.faqService
            .getFaqs()
            .subscribe((faqs) => {
                this.faqs = faqs;
            });
    }

}
