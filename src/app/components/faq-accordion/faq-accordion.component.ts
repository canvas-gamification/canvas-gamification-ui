import {Component, Input, OnInit} from '@angular/core'
import {FAQ} from "@app/_models/faq"
import {FaqService} from "@app/_services/api/faq.service"

@Component({
    selector: 'app-faq-accordion',
    templateUrl: './faq-accordion.component.html',
    styleUrls: ['./faq-accordion.component.scss']
})
export class FaqAccordionComponent implements OnInit {

    faqs: ReadonlyArray<FAQ>
    @Input() showTopX: number

    constructor(private faqService: FaqService) {
    }

    readonly topX = (faq: FAQ) => this.showTopX ? this.faqs.indexOf(faq) < this.showTopX : true

    ngOnInit(): void {
        this.faqService.getFaqs().subscribe(faqs => this.faqs = faqs)
    }
}
