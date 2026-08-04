import {NgModule} from '@angular/core'
import {provideHttpClientTesting} from '@angular/common/http/testing'
import {AppModule} from '@app/app.module'
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http'

@NgModule({imports: [AppModule], providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]})
export class TestModule {
}
