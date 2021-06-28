import {NgModule} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppModule} from '@app/app.module';
import {ProblemsTestModule} from "@app/problems/_test/problems.test.module";

@NgModule({
    imports: [
        AppModule,
        ProblemsTestModule,
        HttpClientTestingModule,
    ],
})
export class TestModule {
}
