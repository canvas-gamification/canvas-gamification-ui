import {Component, Input, OnInit} from '@angular/core'
import {ApiService} from "@app/_services/api.service"
import {ActionType, ActionVerb} from "@app/_models"

@Component({
    selector: 'app-export-snippet',
    templateUrl: './export-snippet.component.html',
    styleUrls: ['./export-snippet.component.scss']
})
export class ExportSnippetComponent implements OnInit {

    @Input() fields?: string[]
    @Input() url: string
    @Input() name: string
    @Input() search: string
    @Input() filters: {
        key: string
        name: string
        type: string
    }[] = []

    selectedFields: string[] = []
    selectedSearch = ''
    selectedFilters: Record<string, any> = {}


    verbs: string[]
    objectTypes: string[]

    constructor(
        private apiService: ApiService
    ) {
    }

    ngOnInit(): void {
        this.verbs = Object.values(ActionVerb)
        this.objectTypes = Object.values(ActionType)
        this.selectedFields = this.fields
        for (const filter of this.filters) {
            this.selectedFilters[filter.key] = null
        }
    }

    getUrl() {
        const params = new URLSearchParams({
            fields: this.selectedFields?.join(','),
            search: this.selectedSearch,
        })
        for (const filter of this.filters) {
            const value = this.selectedFilters[filter.key]
            if (!value) continue
            if (filter.type === 'date') {
                params.set(filter.key, new Date(value.toLocalNativeDate().getTime()).toISOString())
            } else {
                params.set(filter.key, value)
            }
        }
        return this.apiService.getURL('export', this.url) + "?" + params.toString()
    }
}
