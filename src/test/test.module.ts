import {NgModule} from '@angular/core'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {AppModule} from '@app/app.module'

@NgModule({
    imports: [
        AppModule,
        HttpClientTestingModule,
    ],
})
export class TestModule {
}
