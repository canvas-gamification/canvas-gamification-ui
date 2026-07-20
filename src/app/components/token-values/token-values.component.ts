import {Component, Inject, OnInit, ChangeDetectionStrategy} from '@angular/core'
import {TokenValuesService} from '@app/_services/api/token-values.service'
import {CategoryService} from '@app/_services/api/category.service'
import {NestedTokenValue} from '@app/_models'
import {Difficulty} from '@app/_models/difficulty'
import {DifficultyService} from '@app/problems/_services/difficulty.service'
import { TuiAlertService } from "@taiga-ui/core"

@Component({
    selector: 'app-token-values',
    templateUrl: './token-values.component.html',
    styleUrls: ['./token-values.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TokenValuesComponent implements OnInit {
    tokenValues: NestedTokenValue[]
    difficulties: Difficulty[]
    tableColumns: ['name', ...Array<string>] = ['name']

    constructor(
        private tokenValueService: TokenValuesService,
        private categoryService: CategoryService,
        private difficultyService: DifficultyService,
        @Inject(TuiAlertService) private readonly notificationsService: TuiAlertService
    ) {
    }

    ngOnInit(): void {
        this.tokenValueService.getNestedTokenValues().subscribe(tokenValues => this.tokenValues = tokenValues)
        this.difficultyService.getDifficulties().subscribe(difficulties => {
            this.difficulties = difficulties
            this.tableColumns = ['name', ...difficulties.map(difficulty => difficulty[0])]
        })
    }

    submit(): void {
        const data: { id: number, value: number }[] = []
        for (const nestedTokenValue of this.tokenValues) {
            for (const childNestedTokenValue of nestedTokenValue.children) {
                for (const tokenValue of childNestedTokenValue.token_values) {
                    data.push({
                        id: tokenValue.pk,
                        value: tokenValue.value
                    })
                }
            }
        }

        this.tokenValueService.updateBulk(data).subscribe(() => {
            this.notificationsService
                .open('Token values updated successfully', {
                    appearance: 'success'
                }).subscribe()
            window.scroll(0, 0)
        })
    }
}
