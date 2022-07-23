import {fakeAsync, flush, TestBed, tick, waitForAsync} from '@angular/core/testing'
import {AppComponent} from './app.component'
import {TestModule} from '@test/test.module'
import {RouterTestingModule} from '@angular/router/testing'
import {HomepageComponent} from '@app/components/homepage/homepage.component'
import {LandingPageComponent} from '@app/components/landing-page/landing-page.component'
import {AccountsModule} from '@app/accounts/accounts.module'


describe('AppComponent', () => {
    let app: AppComponent

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, LandingPageComponent, HomepageComponent],
            imports: [
                TestModule,
                AccountsModule,
                RouterTestingModule.withRoutes([{
                    path: '',
                    pathMatch: 'full',
                    component: LandingPageComponent,
                }, {
                    path: 'homepage',
                    component: HomepageComponent,
                }], {relativeLinkResolution: 'legacy'})
            ]
        }).compileComponents()
    }))

    beforeEach(() => {
        const fixture = TestBed.createComponent(AppComponent)
        app = fixture.componentInstance
        app['router'].initialNavigation()
    })

    it('should create the app', () => {
        expect(app).toBeTruthy()
    })

    it('should hide footer on landing page', fakeAsync(() => {
        app['router'].navigate(['/'])
        tick()
        expect(app.hideFooterForLanding).toBeTrue()
        flush()
    }))

    it('should show footer on homepage', fakeAsync(() => {
        app['router'].navigate(['/homepage'])
        tick()
        expect(app.hideFooterForLanding).toBeFalse()
        flush()
    }))
})
