import {TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TestModule} from '@test/test.module';

describe('AppComponent', () => {
    let app: AppComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                TestModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        const fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
    });

    it('should create the app', () => {
        expect(app).toBeTruthy();
    });

    it('should hide footer on landing page', () => {
        app['router'].navigate(['/']).then().catch();
        expect(app.hideFooterForLanding).toBeTrue();
    });

    it('should show footer on homepage', () => {
        app['router'].navigate(['/homepage']).then().catch();
        expect(app.hideFooterForLanding).toBeFalse();
    });
});
