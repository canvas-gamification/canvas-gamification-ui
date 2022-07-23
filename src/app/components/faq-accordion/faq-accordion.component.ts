import {Component, Input, OnInit} from '@angular/core'
import {FAQ} from "@app/_models/faq"
import {FaqService} from "@app/_services/api/faq.service"
import {DomSanitizer} from "@angular/platform-browser"

@Component({
    selector: 'app-faq-accordion',
    templateUrl: './faq-accordion.component.html',
    styleUrls: ['./faq-accordion.component.scss']
})
export class FaqAccordionComponent implements OnInit {

    faqs: ReadonlyArray<FAQ>
    @Input() showTopX: number

    constructor(private faqService: FaqService,
                private sanitizer: DomSanitizer) {
    }

    readonly topX = (faq: FAQ): boolean => this.showTopX ? this.faqs.indexOf(faq) < this.showTopX : true

    ngOnInit(): void {
        this.faqService
            .getFaqs()
            .subscribe((faqs) => {
                this.faqs = faqs
                this.faqs.forEach((faq: FAQ) => {
                    faq.safeAnswer = this.sanitizer.bypassSecurityTrustHtml(faq.answer)
                })
            })
    }
}
